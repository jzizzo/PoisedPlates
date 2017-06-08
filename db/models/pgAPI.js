const models = require('./');

const pg = {
  getAllAuctions: (cb) => {
    return models.Auction.collection()
      .fetch({
        columns: ['id', 'category_id', 'location_id', 'end_time', 'title', 'description'],
        withRelated: [{
          'images': (qb) => {
            qb.select('auction_id', 'url');
          },
          'location': (qb) => {
            qb.select('id', 'city', 'state');
          },
          'category': (qb) => {
            qb.select('id', 'name');
          }
        }]
      })
      .then(auctions => {
        return cb(null, auctions);
      })
      .catch(err => {
        return cb(err, null);
      });
  },

  getAuctionById: (auctionId, cb) => {
    return models.Auction
      .where({ id: auctionId })
      // .fetch({
      //   withRelated: ['images', 'location', 'auctionOwner', 'category']
      // })
      .fetch({
        columns: ['id', 'category_id', 'location_id', 'end_time', 'title', 'description'],
        withRelated: [{
          'images': (qb) => {
            qb.select('auction_id', 'url');
          },
          'location': (qb) => {
            qb.select('id', 'city', 'state');
          },
          'category': (qb) => {
            qb.select('id', 'name');
          }
        }]
      })
      .then(auction => {
        cb(null, auction);
      })
      .catch(err => {
        cb(err, null);
      });
  },

  deleteAuctionById: (auctionId, cb) => {
    return models.Auction
      .where({ id: auctionId })
      .destroy()
      .then(deletedAuction => {
        cb(null, deletedAuction);
      })
      .catch(err => {
        cb(err, null);
      });
  },

  postBid: (options, cb) => {
    return models.Bid
      .forge(options)
      .save()
      .then(bid => {
        cb(null, bid);
      })
      .catch(err => {
        cb(err, null);
      });
  },

  getAllCategories: (cb) => {
    return models.Category
      .collection()
      .fetch({
        columns: ['id', 'name']
      })
      .then(categories => {
        cb(null, categories);
      })
      .catch(err => {
        cb(err, null);
      });
  },

  currentUserBid: ({ auctionId, profileId }, cb) => {
    return models.Bid
      .where({ auction_id: auctionId, profile_id: profileId })
      .orderBy('bid', 'desc')
      .fetch({
        columns: ['bid']
      })
      .then(bid => {
        cb(null, bid);
      })
      .catch(err => {
        cb(err, null);
      });
  },

  createAuction: (options, cb) => {
    return models.Location
      .where({ city: options.city, state: options.state })
      .fetch({
        columns: ['id']
      })
      .then(location => {
        if (location) {
          return location;
        } else { // insert city and state into Locations table
          return models.Location
            .forge({
              city: options.city,
              state: options.state
            })
            .save()
            .then(newLocation => {
              return newLocation;
            });
        }
      })
      .then(location => {
        return models.Category
          .where({ name: options.category })
          .fetch({
            columns: ['id']
          })
          .then(category => {
            return models.Auction
              .forge({
                profile_id: options.user,
                category_id: category.id,
                location_id: location.id,
                end_time: options.end_time || new Date(),
                title: options.title,
                description: options.description
              })
              .save()
              .then(newAuction => {
                return models.Image
                  .forge({
                    auction_id: newAuction.id,
                    url: options.url
                  })
                  .save()
                  .then(() => {
                    cb(null, newAuction);
                  });
              });
          });
      });
  },

  retrieveAndUpdateEndingAuctions: (currentTime, cb) => {
    return models.Auction.query((qb) => {
        qb.where('ended', false).andWhere('end_time', '<', currentTime);
      })
      .fetchAll({
        columns: ['id', 'profile_id', 'title'],
        withRelated: ['auctionOwner', 'bidders', {
          'bids': (qb) => {
            qb.orderBy('bid', 'desc').orderBy('created_at', 'asc');
          }
        }]
      })
      .then(auctionModels => {
        let auctions = auctionModels.toJSON();
        return auctions.map((auction) => {
          let winningBidAmt = auction.bids[0].bid;
          let winningBidderProfileId = auction.bids[0].profile_id;
          let winningBidder = auction.bidders
            .filter((bidder) => {
                return bidder.id === winningBidderProfileId;
              })
            .map((winner) => {
              return {
                bid: winningBidAmt,
                first: winner.first,
                last: winner.last,
                email: winner.email
              };
            });
          return {
            auction_id: auction.id,
            auctionTitle: auction.title,
            auctionOwner: {
              first: auction.auctionOwner.first,
              last: auction.auctionOwner.last,
              email: auction.auctionOwner.email
            },
            winningBidder
          };
        });
      })
      .tap(endingAuctions => {
        // update ending auctions
        let auctionIds = endingAuctions.map((auction) => {
          return auction.auction_id;
        });
        return models.Auction.query((qb) => {
          qb.whereIn('id', auctionIds).update({ended: true});
        }).fetch();
      })
      .then(endingAuctions => {
        cb(null, endingAuctions);
      })
      .catch(err => {
        cb(err, null);
      });
  }
};

module.exports = pg;
