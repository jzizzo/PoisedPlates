const models = require('./');

const pg = {
  getAllAuctions: () => {
    return models.Auction.collection().fetch({
      withRelated: ['images', 'location', 'auctionOwner', 'bids', 'category', 'bidsProfiles']
    })
    .then(collection => {
      return collection;
    })
    .catch(error => {
      return error;
    });
  },

  getAuctionById: (auctionId) => {
  return models.Auction
    .where({ id: auctionId })
    .fetch({
      withRelated: ['images', 'location', 'auctionOwner', 'bids', 'category', 'bidsProfiles']
    })
    .then(auction => {
      return auction;
    })
    .catch(error => {
      return error;
    });
}
};

module.exports = pg;
