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
      term : ''
    }
    this.onChange = this.onChange.bind(this);
  }

    onChange(event) {
      this.setState( { term: event.target.value })
  }



  render() {
    return (
      <Paper style={ { textAlign: 'center' } } zDepth={1} rounded={false} >
        <AutoComplete
          dataSource={this.state.dataSource}
          onUpdateInput={() => this.onChange(event)}
          hintText="Search"
          value={this.state.term}
        />
      </Paper>
    )
  }
}

export default connect(null, { queryES })(Search);