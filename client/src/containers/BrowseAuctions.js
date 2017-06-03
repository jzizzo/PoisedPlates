import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuctions } from '../actions';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';


class BrowseAuctions extends Component {

  componentDidMount() {
    this.props.fetchAuctions();
  }

  renderAuctions() {
    const styles = {
      image: {
        height: '300px',
        objectFit: 'cover'
      },
      grow: {
        padding: '4px',
        width: '30rem'
      }
    }
    return _.map(this.props.auctions, auction => {
      console.log(auction);
      return (
        <div key={auction.id} style={styles.grow}>
          <Link to={`/auction/${auction.id}`}>
            <MuiThemeProvider>
              <GridTile
                key={auction.id}
                title={auction.title}
              >
                <img src={auction.images[0].url} style={styles.image}/>
              </GridTile>
            </MuiThemeProvider>
          </Link>
        </div>
      )
    });
  }

  render() {
    const styles = {
      grid: {
          margin: '8px',
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }
      }

    return (
      <div style={styles.grid}>
        {this.renderAuctions()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auctions: state.auctions };
}

export default connect(mapStateToProps, { fetchAuctions })(BrowseAuctions);




