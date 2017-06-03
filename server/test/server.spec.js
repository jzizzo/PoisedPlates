'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');

describe('basic server', function() {
  it('sends back hello world', function(done) {
    request(app)
      .get('/api')
      .expect(200)
      .expect(function(res) {
        expect(res.text).to.equal('Hello World!');
      })
      .end(done);
  });

  it('accepts POST request', function(done) {
    request(app)
      .post('/api')
      .expect(201)
      .expect(function(res) {
        expect(res.body.data).to.equal('Posted!');
      })
      .end(done);
  });

  // get test '/' with random info
    //false

  // get test 'auctions' 
    // should return all from dataBase
      // true

  it('sends back array of categories', function(done) {
    request(app)
      .get('/api/categories')
      .expect(200)
      .expect(function(res) {
        expect(res.text).to.equal(JSON.stringify([{"id":1,"name":"antiques"},{"id":2,"name":"appliances"},{"id":3,"name":"arts+crafts"},{"id":4,"name":"atv/utv/sno"},{"id":5,"name":"auto parts"},{"id":6,"name":"baby+kid"},{"id":7,"name":"beauty+hlth"},{"id":8,"name":"bikes"},{"id":9,"name":"boats"},{"id":10,"name":"books"},{"id":11,"name":"cars+trucks"},{"id":12,"name":"cell phones"},{"id":13,"name":"clothes"},{"id":14,"name":"computers"},{"id":15,"name":"electronics"},{"id":16,"name":"farm+garden"},{"id":17,"name":"furniture"},{"id":18,"name":"general"},{"id":19,"name":"household"},{"id":20,"name":"camping"},{"id":21,"name":"tools"},{"id":22,"name":"toys+games"}]));
      })
      .end(done);
  });

  // it('accepts POST request', function(done) {
  //   request(app)
  //     .post('/api/auctions' )
  //     .expect(201)
  //     .expect(function(res) {
  //       expect(res.body.data).to.equal('Posted!');
  //     })
  //     .end(done);
  // }); 


  // get test auction id:1 
    // contains all proper fields
      //true


  it('sends back auction/2 ', function(done) {
    request(app)
      .get('/api/auction/2')
      .expect(200)
      .expect(function(res) {
        expect(res.text).to.equal(JSON.stringify({"id":2,"profile_id":3,"category_id":1,"location_id":2,"end_time":"2017-06-03T18:30:59.538Z","title":"table","description":"antiques table oak/maple with marble corners","created_at":"2017-06-03T18:30:59.539Z","updated_at":"2017-06-03T18:30:59.539Z","images":[{"id":2,"auction_id":2,"url":"http://i.imgur.com/8QNiXK3.jpg"}],"location":{"id":2,"city":"San Diego","state":"CA"},"bids":[{"id":2,"profile_id":3,"auction_id":2,"bid":"6","created_at":"2017-06-03T18:30:59.543Z","updated_at":"2017-06-03T18:30:59.543Z"}],"auctionOwner":{"id":3,"first":"Steve","last":"Kim","display":null,"email":"emailstevenkim@gmail.com","phone":"650-555-5555","created_at":"2017-06-03T18:30:59.534Z","updated_at":"2017-06-03T18:30:59.534Z","username":null,"location_id":1},"category":{"id":1,"name":"antiques","parent_id":null},"bidsProfiles":[{"id":1,"first":"System","last":"Admin","display":"Administrator","email":"admin@domain.com","phone":null,"created_at":"2017-06-03T18:30:59.300Z","updated_at":"2017-06-03T18:30:59.300Z","username":null,"location_id":null,"_pivot_id":1,"_pivot_profile_id":2}]}));
      })
      .end(done);
  });

  // post? test 'auctions' 
    // should return all from dataBase
      // false

  // post? test auction id:1 
    // contains all proper fields
      //false

  // test /categories are return
    // all categories
      // return true

  // post test /categories are return
    // all categories
      // return false 


  // get auction test
    // check middleware...?



});
