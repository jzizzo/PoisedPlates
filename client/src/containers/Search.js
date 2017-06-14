import React, { Component } from 'react';
import { connect } from 'react-redux';


/* * Utils * */
import { AutoComplete, Paper } from 'material-ui';

/* * Actions * */
import { queryES } from '../actions';

class Search extends Component {
    constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
    this.onChange = this.onChange.bind(this);
  }

    onChange(inputValue) {
  }



  render() {
    return (
      <Paper style={ { textAlign: 'center' } } zDepth={1} rounded={false} >
        <AutoComplete
          dataSource={this.state.dataSource}
          onChange={() => console.log('change')}
          hintText="Search"
        />
      </Paper>
    )
  }
}

export default connect(null, { queryES })(Search);