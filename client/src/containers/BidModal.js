import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleModal } from '../actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class BidModal extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.props.toggleModal}
      />,
      <FlatButton
        label="Place Bid"
        primary={true}
        onClick={this.props.toggleModal}
      />
    ];

    return (
      <MuiThemeProvider>
        <Dialog
          title="Title"
          actions={actions}
          modal={true}
          open={this.props.bidding.modal}
        >
          Hi
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ bidding }) => {
  return {
    bidding: bidding
  };
};

export { BidModal };
export default connect(mapStateToProps, { toggleModal })(BidModal);