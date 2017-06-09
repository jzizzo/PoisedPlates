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

module.exports = router;
