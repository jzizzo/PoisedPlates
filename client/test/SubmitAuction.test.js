import React from 'react';
import SubmitAuction from '../src/containers/SubmitAuction';
import renderer from 'react-test-renderer';


it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <SubmitAuction />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});