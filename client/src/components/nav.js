import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const styles = {
  buttons: {
    marginTop: 5,
    color: '#FFF',
  }
};

export default class Nav extends Component {
  render() {
    return (
      <AppBar
        title="Toss.it"
        iconElementRight={
          <div style={styles.div}>
            <Link to="/">
              <FlatButton label="Home" style={styles.buttons}/>
            </Link>
            <Link to="/post/new">
              <FlatButton label="Post" style={styles.buttons}/>
            </Link>
          </div>
        }
      />
    );
  }
}