import React from 'react';
import ProductPage from '../src/containers/product_page';
import renderer from 'react-test-renderer';

console.log(ProductPage);

it('Should match its default snapshot', () => {
  const tree = renderer.create(
    <ProductPage />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});