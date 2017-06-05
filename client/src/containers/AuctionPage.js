import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { postAuction } from '../actions';

class AuctionPage extends Component {
  componentDidMount() {
    if (this.props.auction) {
      const { id } = this.props.match.params;
      this.props.postAuction(id);
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
            avatar="https://scontent.cdninstagram.com/t51.2885-15/e35/15258783_1219743038096510_7805315801564577792_n.jpg"
          />

          <CardMedia>
            <img src={auction.images[0].url} />
          </CardMedia>

          <CardTitle title={auction.title} subtitle={`${auction.location.city}, ${auction.location.state}`} />

          <CardActions>
            <RaisedButton label="bid" secondary={true} />
          </CardActions>

          <CardText>{auction.description}</CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
};

function mapStateToProps({ auctions }, ownProps) {
  return { auction: auctions[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { postAuction })(AuctionPage);

