import React from 'react';
import Nav from '../src/components/Nav';
import renderer from 'react-test-renderer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});