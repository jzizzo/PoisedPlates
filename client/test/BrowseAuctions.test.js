import React from 'react';
import { BrowseAuctions } from '../src/containers/BrowseAuctions';
import renderer from 'react-test-renderer';

it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <BrowseAuctions fetchAuctions={()=>{}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});