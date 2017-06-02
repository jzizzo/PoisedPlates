import React, { Component } from 'react';
import AuctionForm from '../components/AuctionForm';

export default class SubmitAuction extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Submit Auction Page!</h1>
        <AuctionForm />
      </div>
    )
  }
};