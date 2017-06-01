import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const style = {
  margin: 12,
};

export default class Nav extends Component {
  render() {
    return (
      <AppBar
        title="Toss.it"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
        <Link to="/">
          <RaisedButton label="Home" style={style} />
        </Link>
        <Link to="/post/new">
          <RaisedButton label="Post your stuff here" style={style} />
        </Link>
      </AppBar>
    );
  }
}