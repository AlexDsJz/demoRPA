/*
__Seed builder__
  (Read_only) Example test
  Be careful copying content
*/

import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import Details from 'seed/examples/components/items/Details';

test('examples/components/items/Details', () => {
  mockGql.useDetail({"item": data.GQL_ITEM});
  mockGql.useDelete({"deleteItem": data.GQL_ITEM});
  render(<Details />);
  expect(screen).toBeDefined()
});