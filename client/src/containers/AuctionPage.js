import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidModal from './BidModal';

/* * Actions * */
import { fetchAuction, toggleModal } from '../actions';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AuctionPage extends Component {
  componentDidMount() {
    if (!this.props.auction) {
      const { id } = this.props.match.params;
      this.props.fetchAuction(id);
    }
  }

  render() {
    const { auction } = this.props;
    if (!auction) {
      return <div>Loading...</div>;
    }

    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={auction.title}
            // subtitle="<Rating?>"
            /*avatar="https://scontent.cdninstagram.com/t51.2885-15/e35/15258783_1219743038096510_7805315801564577792_n.jpg"*/
          />

          <CardMedia overlay={<CardTitle subtitle={`Ends: ${auction.end_time}`} />} >
            <img src={auction.images[0].url} />
          </CardMedia>

          <CardTitle title={auction.title} subtitle={`${auction.location.city}, ${auction.location.state}`} />

          <CardActions>
            <RaisedButton label="bid" secondary={true} onClick={this.props.toggleModal}/>
          </CardActions>

          <CardText>
            <BidModal auction={auction} />
            {auction.description}
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
};

const mapStateToProps = ({ auctions, bidding }, ownProps) => {
  return {
    auction: auctions[ownProps.match.params.id],
    bidding: bidding
  };
}

export { AuctionPage };
export default connect(mapStateToProps, { fetchAuction, toggleModal })(AuctionPage);

