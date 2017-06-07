const pg = require('./db/models/pgAPI');

const fetchEndingAuctions = () => {
  pg.retrieveEndingAuctions()
    .then(auctions => {
      // for each auction id
      auctions.forEach((auction) => {
        // get the highest bidder
        return pg.findHighestBidderForAuction(auction.id)
          .then(highestBidder => {
            if (highestBidder) {
              // email the auction owner and the highest bidder
              // auction owner: auction.auctionOwner.email
              // auction first name: auction.auctionOwner.first
            } else {
              // email the auction owner that the auction ended
            }
          })
          .then(() => {
            // update the auction and set ended to false
          })
      })
    })
    .then(auctions => {
      // for each auction id
        // update the ended column to true
    })
};

fetchEndingAuctions();
