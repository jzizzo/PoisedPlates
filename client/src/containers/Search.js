import React, { Component } from 'react';
import { connect } from 'react-redux';


/* * Utils * */
import { AutoComplete, Paper } from 'material-ui';

/* * Actions * */
import { queryES } from '../actions';

class Search extends Component {
    constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
  }

    onChange(inputValue) {
  }



  render() {
    return (
      <Paper style={ { textAlign: 'center' } } zDepth={1} rounded={false} >
        <AutoComplete
          dataSource={this.state.dataSource}
          onChange={() => console.log('change')}
          placeholder="Search"
        />
      </Paper>
    )
  }
}

export default connect(null, { queryES })(Search);