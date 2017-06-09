const CronJob = require('cron').CronJob;
const pg = require('../db/models/pgAPI');
const config = require('config')['mailgun'];
const Mailgun = require('mailgun-js');
const nunjucks = require('nunjucks');
nunjucks.configure('./');
// console.log('env: ', env);

const constructEmailTemplates = (options) => {
  let ownerEmailTemplate;
  let winnerEmailTemplate;
  if (options.winningBidder === null) {
    ownerEmailTemplate = nunjucks.render('services/owner_unsold_template.html', {
      first: options.auctionOwner.first,
      auctionOwnerEmail: options.auctionOwner.email,
      title: options.auctionTitle,
      auction_id: options.auction_id
    });
  } else {
      winnerEmailTemplate = nunjucks.render('services/winner_template.html', {
        first: options.winningBidder.first,
        winningBidderEmail: options.winningBidder.email,
        auctionOwnerEmail: options.auctionOwner.email,
        title: options.auctionTitle,
        auction_id: options.auction_id
      });
      ownerEmailTemplate = nunjucks.render('services/owner_unsold_template.html', {
        first: options.auctionOwner.first,
        winningBidderEmail: options.winningBidder.email,
        auctionOwnerEmail: options.auctionOwner.email,
        title: options.auctionTitle,
        auction_id: options.auction_id
      });
  }
  return { owner: ownerEmailTemplate, winner: winnerEmailTemplate };
};

const sendMessage = (params) => {
  console.log("I'm in sendMessage!");
  const mailgun = new Mailgun({
    apiKey: config.API_KEY,
    domain: config.DOMAIN
  });
  mailgun.messages().send(params, (err, result) => {
    if (err) {
      console.log('Error sending an email', err);
    } else {
      console.log('Successfully sent email');
    }
  });
};

// const processEndingAuctions = new CronJob({
//   cronTime: '00 0-59 * * * *',
//   onTick: function() {
//     let currentTime = new Date(Date.now());
//     pg.retrieveAndUpdateEndingAuctions(currentTime, (err, auctions) => {
//       if (auctions) {
//         auctions.forEach((auction) => {
//           let { ownerEmailTemplate, winnerEmailTemplate } = constructEmailTemplates(auction);
//           let ownerParams = {
//             from: config.mailgun.FROM,
//             to: ownerEmailTemplate.auctionOwnerEmail,
//             subject: 'Your Toss It auction ended!',
//             html: ownerEmailTemplate
//           };
//           sendMessage(ownerParams);
//           if (winnerEmailTemplate) {
//             let winnerParams = {
//               from: config.mailgun.FROM,
//               to: winnerEmailTemplate.winningBidderEmail,
//               subject: 'Toss It auction has ended!',
//               html: winnerEmailTemplate
//             };
//             sendMessage(winnerParams);
//           }
//         });
//       }
//     });
//   },
//   start: true
// });
//
// processEndingAuctions.start();

const processEndingAuctions = () => {
    let currentTime = new Date(Date.now());
    pg.retrieveAndUpdateEndingAuctions(currentTime, (err, auctions) => {
      if (auctions) {
        auctions.forEach((auction) => {
          let test = constructEmailTemplates(auction);
          let { owner, winner } = constructEmailTemplates(auction);

          let ownerParams = {
            from: config.FROM,
            to: auction.auctionOwner.email,
            subject: 'Your Toss It auction ended!',
            html: owner
          };
          console.log('to owner: ', ownerParams.to);
          sendMessage(ownerParams);
          if (winner) {
            let winnerParams = {
              from: config.FROM,
              to: auction.winningBidder.email,
              subject: 'Toss It auction has ended!',
              html: winner
            };
            console.log('to winner: ', winnerParams.to);
            sendMessage(winnerParams);
          }
        });
      }
    });
};

processEndingAuctions();
