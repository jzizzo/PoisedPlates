'use strict';
const express = require('express');
const router = express.Router();
const ProfilesController = require('../controllers').Profiles;

router.route('/')
  .get(ProfilesController.getAll)
  // .post(ProfilesController.create)
  ;

router.route('/:id')
  .get(ProfilesController.getOne)
  .put(ProfilesController.update)
  // .delete(ProfilesController.deleteOne)
  ;

router.route('/:id/auctions')
  .get((req, res) => {
    ProfilesController.getAuctionsByOwner(req.params.id, (err, auctions) => {
      if (err) {
        res.status(503).send(err);
      }
      res.status(200).send(auctions);
    });
  });

router.route('/:id/biddedAuctions')
  .get((req, res) => {
    ProfilesController.getBiddedAuctions(req.params.id, (err, auctionBids) => {
      if (err) {
        res.status(503).send(err);
      }
      res.status(200).send(auctionBids);
    });
  });

module.exports = router;
