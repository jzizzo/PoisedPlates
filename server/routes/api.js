'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../db/models');

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
      console.log(models.Category);
      return models.Category.collection().fetch()
      .then(collection => {
        res.send(collection);
      });
    });

  router.route('/profileBids')
    .get((req, res) => {
      return models.ProfileBids.collection().fetch({
        withRelated: ['auctions', 'profiles']
      })
        .then(collection => {
          res.send(collection);
        });
    });

const sample = {
  img:
  title: 'apple '
};


module.exports = router;
