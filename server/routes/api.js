'use strict';
const express = require('express');
const router = express.Router();
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

router.route('/auction/:id')
  .get((req, res) => {
    pg.getAuctionById(req.params.id)
      .then(auctionData => {
        res.status(200).send(auctionData);
      })
      .catch(error => {
        res.status(404);
      });
  })
  .delete(middleware.auth.verify, (req, res) => {
    pg.deleteAuctionById(req.params.id)
      .then(deletedAuctionData => {
        res.status(202).send(deletedAuctionData);
      })
      .catch(error => {
        res.status(410);
      });
  });

router.route('/categories')
  .get((req,res) => {
    pg.getAllCategories()
      .then(categories => {
        res.status(200).send(categories);
      })
      .catch(error => {
        res.status(404);
      });
  });

//middleware.auth.verify,
router.route('/auction')
  .post(middleware.auth.verify, (req, res) => {
    // const options = Object.assign({}, req.body, req.session.passport);
    const options = Object.assign({}, req.body);
    pg.createAuction(options)
    .then(() => {
      res.status(200).redirect('/');
    })
    .catch(error => {
      res.status(401);
    });
  });

module.exports = router;

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
  
  router.route('/auction/')
  //middleware.auth.verify,
  // put into post before (req, res)
    .post(middleware.auth.verify, (req, res) => {
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

