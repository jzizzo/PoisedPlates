import React, { Component } from 'react';
import { connect } from 'react-redux';


/* * Utils * */
import SearchBar from 'material-ui-search-bar';

/* * Actions * */
import { queryES } from '../actions';


export default class Search extends Component {

  render() {
    return (
      <SearchBar
        onChange={ () => console.log('onChange') }
        onRequestSearch={ () => console.log('onRequestSearch') }
        style={ {
          margin: '0 auto',
          maxWidth: 800
        } }
      />
    )
  }
}
