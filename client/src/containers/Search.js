import React, { Component } from 'react';

/* * Utils * */
import SearchBar from 'material-ui-search-bar';

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
