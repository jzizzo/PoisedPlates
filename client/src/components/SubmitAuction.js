import React, { Component } from 'react';

/* * Containers * */
import AuctionForm from '../containers/AuctionForm';

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
    console.log(this.props)
    return (
      <div style={styles.outer} >
        <AuctionForm
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        />
      </div>
    )
  }
};
