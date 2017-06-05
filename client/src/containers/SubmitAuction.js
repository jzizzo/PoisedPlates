import React, { Component } from 'react';
import AuctionForm from '../components/AuctionForm';

export default class SubmitAuction extends Component {
  render() {
    const styles = {
      outer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
    return (
      <div style={styles.outer} >
        <AuctionForm />
      </div>
    )
  }
};
