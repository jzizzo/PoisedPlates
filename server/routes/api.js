'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../../db/models/pgAPI');
const middleware = require('../middleware');

router.route('/auctions')
  .get((req, res) => {
    pg.getAllAuctions((err, auctions) => {
      if (err) {
        console.log("Couldn't get all auctions: ", err);
        res.status(404);
      }
      res.status(200).send(auctions);
    });
  });

router.route('/auction/:id')
  .get((req, res) => {
    pg.getAuctionById(req.params.id, (err, auction) => {
      if (err) {
        console.log("Couldn't get auction info: ", err);
        res.status(404);
      }
      res.status(200).send(auction);
    });
  })
  .delete(middleware.auth.verify, (req, res) => {
    pg.deleteAuctionById(req.params.id, (err, deletedAuction) => {
      if (err) {
        console.log("Couldn't delete auction: ", err);
        res.status(410);
      }
      res.status(202).send(deletedAuction);
    });
  })
  .post((req, res) => {
    let options = {
      auctionId: req.params.id,
      profileId: req.session.passport.user,
      bidAmt: req.body.amt
    };
    pg.postBid(options, (err, bid) => {
      if (err) {
        console.log("Couldn't post a bid: ", err);
        res.status(404);
      }
      res.status(200).send(bid);
    });
  });

router.route('/categories')
  .get((req,res) => {
    pg.getAllCategories((err, categories) => {
      if (err) {
        res.status(404);
      }
      res.status(200).send(categories);
    });
  });

router.route('/auction')
  .post(middleware.auth.verify, (req, res) => {
    const options = Object.assign({}, req.body, req.session.passport);
    // const options = Object.assign({}, req.body); // for test purpose
    pg.createAuction(options, (err, auction) => {
      if (err) {
        console.log("Couldn't create an auction: ", err);
        res.status(401);
      }
      res.status(200).redirect('/');
    });
  });

router.route(middleware.auth.verify, '/auction/:auction_id/currentBid')
  .get((req, res) => {
    let options = {
      auctionId: req.params.auction_id,
      profileId: req.session.passport.user
    };
    pg.currentUserBid(options, (err, bid) => {
      if (err) {
        console.log("Couldn't get the current bid: ", err);
        res.status(404);
      }
      res.status(200).send(bid);
    });
  });

// testing purposes
router.route('/endingAuctions')
  .get((req, res) => {
    let currentTime = new Date(Date.now());
    // pg.retrieveAndUpdateEndingAuctions()
    //   .then(endingAuctions => {
    //     res.send(endingAuctions);
    //   });
    pg.retrieveAndUpdateEndingAuctions(currentTime, (err, endingAuctions) => {
      if (err) {
        console.log("Couldn't find ending auctions: ", err);
        res.status(400);
      }
      res.status(200).send(endingAuctions);
    });
  });

module.exports = router;
