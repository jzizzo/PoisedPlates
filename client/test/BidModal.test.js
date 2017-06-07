import React from 'react';
import { BidModal } from '../src/containers/BidModal';
import renderer from 'react-test-renderer';

it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <BidModal />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});