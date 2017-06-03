import React from 'react';
import { AuctionPage } from '../src/containers/AuctionPage';
import renderer from 'react-test-renderer';

it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <AuctionPage />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});