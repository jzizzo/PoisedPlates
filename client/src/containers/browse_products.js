import _ from 'lodash';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';


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

  render() {
    const styles = {
      image: {
        height: '300px',
        objectFit: 'cover'
      },
      grid: {
        margin: '8px',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      grow: {
        padding: '4px',
        width: '30rem'
      }
    }
    return (
      <div style={styles.grid}>
        {_.map(this.data, listing => (
          <div key={listing.id} style={styles.grow}>
            <Link to={`/product/${listing.id}`}>
              <MuiThemeProvider>
                <GridTile
                  key={listing.id}
                  title="<listing.title>"
                  subtitle="listing.subtitle"
                >
                  <img src={listing['img-url']} style={styles.image}/>
                </GridTile>
              </MuiThemeProvider>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default BrowseProducts;