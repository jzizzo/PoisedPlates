import _ from 'lodash';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';





class BrowseProducts extends Component {
  constructor(props) {
    super(props);


  this.data = {
  0: {
    id: 0,
    'img-url': 'https://scontent.cdninstagram.com/t51.2885-15/e35/13767731_117068665403701_2114431511_n.jpg'
  },
  1: {
    id: 1,
    'img-url': 'https://scontent.cdninstagram.com/t51.2885-15/e35/14334643_1830784853818907_1806926123_n.jpg'
  },
  2: {
    id: 2,
    'img-url': 'https://scontent.cdninstagram.com/t51.2885-15/e35/14718580_182287928890662_5624130631819591680_n.jpg'
  },
  3: {
    id: 3,
    'img-url': 'https://scontent.cdninstagram.com/t51.2885-15/e35/14730541_209363642837720_5674879205179916288_n.jpg'
  },
  4: {
    id: 4,
    'img-url': 'https://scontent.cdninstagram.com/t51.2885-15/e35/15258783_1219743038096510_7805315801564577792_n.jpg'
  }
};
  }

  renderPosts() {
    return _.map(this.data, listing => {
      return (
        <Link to={`/auction/${listing.id}`} key={listing.id}>
          <img key={listing.id} src={listing['img-url']} height={250} />
        </Link>
      )
    });
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    )
  }
}

export default BrowseProducts;