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
import Details from 'seed/examples/components/orders/Details';

test('examples/components/orders/Details', () => {
  mockGql.useDetail({"order": data.GQL_ORDER});
  mockGql.useDelete({"deleteOrder": data.GQL_ORDER});
  render(<Details />);
  expect(screen).toBeDefined()
});