'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../db/models');
const pg = require('../../db/models/pgAPI');
const middleware = require('../middleware');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/auctions')
  .get((req, res) => {
    pg.getAllAuctions()
      .then(auctions => {
        res.status(200).send(auctions);
      })
      .catch(error => {
        res.status(404);
      });
  });

// router.route('/auction/:id')
//   .get((req, res) => {
//     pg.getAuctionById(req.params.id)
//       .then(auctionData => {
//         res.status(200).send(auctionData);
//       })
//       .catch(error => {
//         res.status(404);
//       });
//   })
//   .delete((req, res) => {
//     pg.deleteAuctionById(req.params.id)
//       .then(deletedAuctionData => {
//         res.status(202).send(deletedAuctionData);
//       })
//       .catch(error => {
//         res.status(410);
//       });
//   });

router.route('/auction/:id')
  .get((req, res) => {
    console.log('req.params.id', req.params.id)
    return models.Auction.where({ id: req.params.id}).fetch({withRelated: ['images', 'location', 'auctionOwner', 'bids', 'category', 'bidsProfiles']
    })
      .then(auctionData => {
        res.send(auctionData);
      });
  })
  .delete((req, res) => {
    return models.Auction
      .where({ id: req.params.id })
      .destroy()
      .then( () => {
        res.status(202);
      });
  });


  router.route('/categories')
    .get((req,res) => {
      return models.Category.collection()
      .fetch({
        columns: ['id', 'name']
      })
      .then(collection => {
        res.send(collection);
      });
    });

// profilebids not currently working
// after mvp for display whether an auction has a bid
  // router.route('/profileBids')
  //   .get((req, res) => {
  //     console.log('>>',req)
  //     return models.ProfileBids.collection().fetch({
  //       withRelated: ['auctions', 'profiles']
  //     })
  //       .then(collection => {
  //         res.send(collection);
  //       });
  //   });

  const SAMPLE = {
    img: [],
    title: 'Original 70s bell bottoms',
    description: '',
    city: 'Austin',
    state: 'Texas',
    date: new Date(),
    category: 'camping'
  };

  router.route('/auction/')
  //middleware.auth.verify,
  // put into post before (req, res)
    .post( (req, res) => {
        return models.Location.where({city: req.body.city, state: req.body.state})
        .fetch({
          columns: ['id']
        })
        .then(id => {
          if (id) {
            return id;
          } else { //insert city and state into db
            return models.Location
              .forge({
                city: req.body.city,
                state: req.body.state
              })
              .save()
              .then(data => {
                // returns new increment of locations table insert
                return data.id;
              });
          }
        })
        .then( locationId => {
          return models.Category.where({name: req.body.category})
            .fetch({
              columns: ['id']
            })
            .then( categoryId => {
              return models.Auction
                .forge({
                  // profile_id is dummy as middleware.auth is commented out
                  profile_id: 4,
                  category_id: categoryId.id,
                  location_id: locationId.id,
                  end_time: req.body.end_time || new Date() ,
                  title: req.body.title,
                  description: req.body.description
                })
                .save()
                .then( newAuction => {
                  return models.Image
                    .forge({
                      auction_id: newAuction.id,
                      url: req.body.url
                    })
                    .save()
                    .then( insertImage => {
                      res.redirect(202, '/');
                    })
                })
            })
        }).catch( reason => {
          console.log(`Handle rejected promise (${reason}) here.`);
        })
    });


module.exports = router;
