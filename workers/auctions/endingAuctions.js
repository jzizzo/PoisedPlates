const CronJob = require('cron').CronJob;
const pg = require('../../db/models/pgAPI');
const config = require('config')['mailgun'];
const Mailgun = require('mailgun-js');
const nunjucks = require('nunjucks');
nunjucks.configure('./');

const path = 'workers/auctions';

const constructEmailTemplates = (options) => {
  let ownerEmailTemplate;
  let winnerEmailTemplate;
  if (options.winningBidder === null) {
    // auction ended with no bidders
    ownerEmailTemplate = nunjucks.render(`${path}/owner_unsold_template.html`, {
      first: options.auctionOwner.first,
      auctionOwnerEmail: options.auctionOwner.email,
      title: options.auctionTitle,
      auction_id: options.auction_id
    });
  } else {
      // auction ended with a bidder
      winnerEmailTemplate = nunjucks.render(`${path}/winner_template.html`, {
        first: options.winningBidder.first,
        winningBidderEmail: options.winningBidder.email,
        auctionOwnerEmail: options.auctionOwner.email,
        title: options.auctionTitle,
        auction_id: options.auction_id
      });
      ownerEmailTemplate = nunjucks.render(`${path}/owner_sold_template.html`, {
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
  const mailgun = new Mailgun({
    apiKey: config.Mailgun.API_KEY,
    domain: config.Mailgun.DOMAIN
  });
  mailgun.messages().send(params, (err, result) => {
    if (err) {
      console.log('Error sending an email', err);
    } else {
      console.log('Successfully sent email');
    }
  });
};

const notifyAuctionOwnersAndWinners = () => {
    let currentTime = new Date(Date.now());
    pg.retrieveAndUpdateEndingAuctions(currentTime, (err, auctions) => {
      if (auctions) {
        auctions.forEach((auction) => {
          let { owner, winner } = constructEmailTemplates(auction);

          let ownerParams = {
            from: config.Mailgun.FROM,
            to: auction.auctionOwner.email,
            subject: 'Your Toss It auction ended!',
            html: owner
          };
          sendMessage(ownerParams);
          if (winner) {
            let winnerParams = {
              from: config.Mailgun.FROM,
              to: auction.winningBidder.email,
              subject: 'Toss It auction has ended!',
              html: winner
            };
            sendMessage(winnerParams);
          }
        });
      }
    });
};

// notifyAuctionOwnersAndWinners();

const processEndingAuctions = new CronJob({
  cronTime: '00 0-59 * * * *',
  onTick: function() {
    notifyAuctionOwnersAndWinners();
  },
  start: true
});

processEndingAuctions.start();
