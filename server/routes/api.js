'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../db/models');
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
    return models.Auction.collection().fetch({
      withRelated: ['images', 'location', 'auctionOwner', 'bids', 'category', 'bidsProfiles']
    })
      .then(collection => {
        res.send(collection);
      });
  });


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
      return models.Category.collection().fetch()
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
      console.log('auction>post>loc: ', req.query)
        return models.Location.where({city: req.query.city, state: req.query.state})
        .fetch({
          columns: ['id']
        })
        .then(id => {
          if (id) {
            return id;
          } else { //insert city and state into db
            models.Location
              .forge({
                city: req.query.city,
                state: req.query.state
              })
              .save()
              .then(data => {
                // returns new increment of locations table insert
                return data.id;
              });
          }
        })
    });
  

module.exports = router;
