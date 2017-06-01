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
    // console.log(models.Auction);
    // models.Auction.getAllAuctions()
    //   .then(collections => {
    //     res.send(collections);
    //   })
    //   .catch(error => {
    //     res.send("Error fetching auctions");
    //   });
    console.log(models.Auction);
    return models.Auction.collection().fetch({
      withRelated: ['images']
    })
      .then(collection => {
        res.send(collection);
      });
    // return models.Auction
    //   .fetch({
    //     withRelated: ['image']
    //   })
    //   .then(auctions => {
    //     res.status(200).send(auctions);
    //   })
    //   .catch(error => {
    //     console.log("Error fetching auctions");
    //   });
  });

module.exports = router;
