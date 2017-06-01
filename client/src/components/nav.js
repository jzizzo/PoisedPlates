import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div>Nav goes here</div>
        <Link to="/post/new">Post your stuff here</Link>
      </div>
    );
  }
}