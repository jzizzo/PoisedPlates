import React from 'react';
import AuctionForm from '../src/components/AuctionForm';
import renderer from 'react-test-renderer';


it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <AuctionForm />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});