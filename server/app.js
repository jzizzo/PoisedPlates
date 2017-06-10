'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes/index');

const app = express();

const auctionWorker = require('../workers/auctions/endingAuctions.js');

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);


const crypto = require('crypto');
const config = require('config')['aws'];

const s3Config = {};
s3Config.accessKey = process.env.AWS_KEY || config.KEY;
s3Config.secretKey = process.env.AWS_SECRET || config.SECRET;
s3Config.bucket = process.env.S3_BUCKET || config.S3_BUCKET;
s3Config.region = process.env.S3_REGION || 'us-west-2';

app.get('/s3', (request, response) => {
    if (request.query.name) {
      response.json(s3Credentials(s3Config, {
        filename: request.query.name,
        contentType: request.query.type
      }));
    } else {
      response.status(400).send('filename is required');
    }
  });

// <-------------------------------------------------------------------------->
// This is the entry function that produces data for the frontend
// config is hash of S3 configuration:
// * bucket
// * region
// * accessKey
// * secretKey
function s3Credentials(config, params) {
  return {
    endpoint_url: "https://" + config.bucket + ".s3.amazonaws.com",
    params: s3Params(config, params)
  }
}

// Returns the parameters that must be passed to the API call
function s3Params(config, params) {
  var credential = amzCredential(config);
  var policy = s3UploadPolicy(config, params, credential);
  var policyBase64 = new Buffer(JSON.stringify(policy)).toString('base64');
  return {
    key: params.filename,
    acl: 'public-read',
    success_action_status: '201',
    policy: policyBase64,
    "content-type": params.contentType,
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    'x-amz-credential': credential,
    'x-amz-date': dateString() + 'T000000Z',
    'x-amz-signature': s3UploadSignature(config, policyBase64, credential)
  }
}

function dateString() {
  var date = new Date().toISOString();
  return date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
}

function amzCredential(config) {
  return [config.accessKey, dateString(), config.region, 's3/aws4_request'].join('/')
}

// Constructs the policy
function s3UploadPolicy(config, params, credential) {
  return {
    // 5 minutes into the future
    expiration: new Date((new Date).getTime() + (5 * 60 * 1000)).toISOString(),
    conditions: [
      { bucket: config.bucket },
      { key: params.filename },
      { acl: 'public-read' },
      { success_action_status: "201" },
      // Optionally control content type and file size
      // A content-type clause is required (even if it's all-permissive)
      // so that the uploader can specify a content-type for the file
      ['starts-with', '$Content-Type',  ''],
      ['content-length-range', 0, 1000],
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
      { 'x-amz-credential': credential },
      { 'x-amz-date': dateString() + 'T000000Z' }
    ],
  }
}

function hmac(key, string) {
  var hmac = require('crypto').createHmac('sha256', key);
  hmac.end(string);
  return hmac.read();
}

// Signs the policy with the credential
function s3UploadSignature(config, policyBase64, credential) {
  var dateKey = hmac('AWS4' + config.secretKey, dateString());
  var dateRegionKey = hmac(dateKey, config.region);
  var dateRegionServiceKey = hmac(dateRegionKey, 's3');
  var signingKey = hmac(dateRegionServiceKey, 'aws4_request');
  return hmac(signingKey, policyBase64).toString('hex');
}

app.get('/*', (req, res) => {
  res.render('index.ejs', {user: req.user ? req.user : null});
});

module.exports = app;
