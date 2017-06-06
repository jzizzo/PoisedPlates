import React, { Component } from 'react';

/* * Utils * */
import { Link } from 'react-router-dom';

/* * Styles * */
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
  title: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#FFF'
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
          title={<Link to="/" style={styles.title}>Toss.it</Link>}
          iconElementRight={
            <div style={styles.div}>
              <Link to="/auction">
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