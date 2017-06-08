import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import { toggleModal, fetchBid, postBid } from '../actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

const required = value => (value == null ? 'Required' : undefined);


class BidModal extends Component {
  componentDidMount() {
    this.props.fetchBid(this.props.auction.id);
  }

  validBid(value) {
    if (value && !/^[0-9]+$/i.test(value)) {
      return 'Must be a whole number';
    } else if (value && Number(value) <= Number(this.props.currentBid)) {
      return 'Must be greater than your current bid';
    } else {
      return undefined;
    }
  }

  submitBid(input) {
    console.log('bid:', input.bid);
    this.props.postBid(this.props.auction.id, Number(input.bid));
    this.props.toggleModal();
    this.props.reset();
    this.props.fetchBid(this.props.auction.id);
  }

  handleCancel() {
    this.props.toggleModal();
    this.props.reset();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Place Bid"
        primary={true}
        onClick={this.props.handleSubmit(this.submitBid.bind(this))}
      />
    ];

    return (
      <MuiThemeProvider>
        <Dialog
          title={`Ends: ${this.props.auction.end_time}`}
          actions={actions}
          modal={true}
          open={this.props.modal}
        >
          <Field
            name="bid"
            component={TextField}
            hintText="$"
            validate={[required, this.validBid.bind(this)]}
          />
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ bidding }, ownProps) => {
  return {
    auction: ownProps.auction,
    modal: bidding.modal,
    currentBid: bidding.currentBid
  };
};

export { BidModal };
export default reduxForm({
  form: 'placeBid'
})(connect(mapStateToProps, { toggleModal, fetchBid, postBid })(BidModal));
