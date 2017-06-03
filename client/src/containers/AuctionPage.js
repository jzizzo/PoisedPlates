import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { fetchAuction } from '../actions';

class AuctionPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAuction(id);
  }

  render() {
    const { auction } = this.props;
    console.log(auction)
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title="<User>"
            subtitle="<Rating?>"
            avatar="https://scontent.cdninstagram.com/t51.2885-15/e35/15258783_1219743038096510_7805315801564577792_n.jpg"
          />

          <CardMedia>
            <img src="https://scontent.cdninstagram.com/t51.2885-15/e35/14334643_1830784853818907_1806926123_n.jpg" />
          </CardMedia>

          <CardTitle title="<Item Title>" subtitle="<Location?>" />

          <CardActions>
            <FlatButton label="BID" />
          </CardActions>

          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
};

function mapStateToProps({ auctions }, ownProps) {
  return { auction: auctions[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchAuction })(AuctionPage);

