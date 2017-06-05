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
        expect(deepEquals(auctionTimeFilter(res.text), {id:2,profile_id:3,category_id:1,location_id:2,title:'table',description:'antiques table oak/maple with marble corners',images:[{id:2,auction_id:2,url:'http://i.imgur.com/8QNiXK3.jpg'}],location:{id:2,city:'San Diego',state:'CA'},auctionOwner:{id:3,first:'Steve',last:'Kim',display:null,email:'emailstevenkim@gmail.com',phone:'650-555-5555',username:null,location_id:1},bids:[{id:2,profile_id:3,auction_id:2,bid:'6'}],bidsProfiles:[{id:1,first:'System',last:'Admin',display:'Administrator',email:'admin@domain.com',phone:null,username:null,location_id:null,_pivot_id:1,_pivot_profile_id:2}],category:{id:1,name:'antiques',parent_id:null}})).be.false
                                                      //  
      })
      .end(done);
  });


  it('accepts get all auctions', function(done) {
    request(app)
      .get('/api/auctions')
      .expect(function(res) {
        let allAuctions = res.body.map( (auction) => auctionTimeFilter(auction) );
        expect(deepEquals(allAuctions, [{id:1,profile_id:2,category_id:17,location_id:1,title:'sofa',description:'Brown Love Seat slight worn',images:[{id:1,auction_id:1,url:'http://moviesnow.club/wp-content/uploads/2017/03/Ea-Brown-Leather-Trend-Used-Leather-Sofa.jpg'}],auctionOwner:{id:2,first:'Jim',last:'Lee',display:null,email:'jimleeisme@gmail.com',phone:'313-555-5555',username:null,location_id:1},location:{id:1,city:'San Francisco',state:'CA'},bids:[{id:1,profile_id:2,auction_id:1,bid:'5'}],category:{id:17,name:'furniture',parent_id:null},bidsProfiles:[]},{id:2,profile_id:3,category_id:1,location_id:2,title:'table',description:'antiques table oak/maple with marble corners',images:[{id:2,auction_id:2,url:'https://thumbs.dreamstime.com/z/round-wooden-antique-table-3d-12158532.jpg'}],auctionOwner:{id:3,first:'Steve',last:'Kim',display:null,email:'emailstevenkim@gmail.com',phone:'650-555-5555',username:null,location_id:1},location:{id:2,city:'San Diego',state:'CA'},bids:[{id:2,profile_id:3,auction_id:2,bid:'6'}],category:{id:1,name:'antiques',parent_id:null},bidsProfiles:[{id:1,first:'System',last:'Admin',display:'Administrator',email:'admin@domain.com',phone:null,username:null,location_id:null,_pivot_id:1,_pivot_profile_id:2}]},{id:3,profile_id:4,category_id:20,location_id:3,title:'rain proof tent',description:'REI 2010 green medium tent',images:[{id:3,auction_id:3,url:'https://www.rei.com/media/a1c8e1cc-c4c6-4468-8472-b261ff6e7b7c'}],auctionOwner:{id:4,first:'Joe',last:'Zizzo',display:null,email:'zizzo.joseph.k@gmail.com',phone:'510-555-5555',username:null,location_id:1},location:{id:3,city:'New York',state:'NY'},bids:[{id:3,profile_id:4,auction_id:3,bid:'7'}],category:{id:20,name:'camping',parent_id:null},bidsProfiles:[{id:2,first:'Jim',last:'Lee',display:null,email:'jimleeisme@gmail.com',phone:'313-555-5555',username:null,location_id:1,_pivot_id:2,_pivot_profile_id:3}]},{id:4,profile_id:5,category_id:15,location_id:4,title:'Canon camera',description:'camera 35MM cannon',images:[{id:4,auction_id:4,url:'http://68.media.tumblr.com/905ed2246fcb4db31725dec44bdd4562/tumblr_inline_nqhuljHpnz1qarqqa_1280.jpg'}],auctionOwner:{id:5,first:'Doug',last:'Cox',display:null,email:'dougecox@gmail.com',phone:'415-305-9739',username:null,location_id:4},location:{id:4,city:'Chicago',state:'IL'},bids:[{id:4,profile_id:5,auction_id:4,bid:'8'}],category:{id:15,name:'electronics',parent_id:null},bidsProfiles:[{id:3,first:'Steve',last:'Kim',display:null,email:'emailstevenkim@gmail.com',phone:'650-555-5555',username:null,location_id:1,_pivot_id:3,_pivot_profile_id:4}]}])).to.equal(true);
      })
      .end(done);
  });

  it('accepts POST request', function(done) {
    var sampleData = {
      profile_id: 3,
      city: "Tuscon",
      state: "AZ",
      category: 'tools',
      title: 'wrench',
      description: "Family heirloom originally used to fix WWI fight planes",
      url: "http://imgur.com/gallery/BnWJI6O",
      end_time: new Date()
    };

    request(app)
      .post('/api/auction')
      .expect(202)
      .expect(function(res) {
        expect(res.body.data).to.equal('Posted!');
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

  function auctionTimeFilter(obj) {
    // when time figure out why Object.assign({}, obj) didn't work
    let copyObj = obj;
    let keys = Object.keys(copyObj);
    delete copyObj.created_at;
    delete copyObj.updated_at;
    delete copyObj.end_time;
    copyObj.bids && copyObj.bids.forEach( (bid) => {
      delete bid.created_at;
      delete bid.updated_at;
    });
    if (copyObj.auctionOwner) { delete copyObj.auctionOwner.created_at };
    if (copyObj.auctionOwner) { delete copyObj.auctionOwner.updated_at };
    copyObj.bidsProfiles && copyObj.bidsProfiles.forEach( (bid) => {
      delete bid.created_at;
      delete bid.updated_at;
    });
    return copyObj;
  };

  var deepEquals = function(apple, orange) {
    if (apple === orange) { return true; }
    if (apple && !orange || !apple && orange) { return false; }
    if (!(apple instanceof Object) || !(orange instanceof Object)) { return false; }
    var appleKeys = Object.keys(apple);
    var orangeKeys = Object.keys(orange);
    if (appleKeys.length !== orangeKeys.length) { return false; }
    if (appleKeys.length === 0) { return true; } // two empty objects are equal
    for (var i = 0; i < appleKeys.length; i++) {
      if (!deepEquals(apple[appleKeys[i]], orange[appleKeys[i]])) { return false; }
    }
    return true;
  };

});
