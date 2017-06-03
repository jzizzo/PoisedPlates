import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { deepPurple500 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const styles = {
  nav: {
    backgroundColor: deepPurple500
  },
  buttons: {
    marginTop: 5,
    color: '#FFF',
  }
};

export default class Nav extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="Toss.it"
          iconElementRight={
            <div style={styles.div}>
              <Link to="/">
                <FlatButton label="Home" style={styles.buttons}/>
              </Link>
              <Link to="/auction/new">
                <FlatButton label="Post" style={styles.buttons}/>
              </Link>
            </div>
          }
          style={styles.nav}
        />
      </MuiThemeProvider>
    );
  }
}