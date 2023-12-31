/*
__Seed builder__
  (Read_only) Example test
  Be careful copying content
*/

import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data';
import FormSet from 'seed/examples/components/orders/FormSet';

test('examples/components/orders/FormSet', () => {
  mockGql.useDetail({"order": data.GQL_ORDER});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useQuery({"cranes": data.GQL_CRANES});
  mockGql.useSet({"setOrder": data.GQL_ORDER});
  render(<FormSet />);
  expect(screen).toBeDefined();
});