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
import FormSet from 'seed/examples/components/arris_operators/FormSet';

test('examples/components/arris_operators/FormSet', () => {
  mockGql.useDetail({"arrisOperator": data.GQL_ARRIS_OPERATOR});
  mockGql.useQuery({"orders": data.GQL_ORDERS});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useSet({"setArrisOperator": data.GQL_ARRIS_OPERATOR});
  render(<FormSet />);
  expect(screen).toBeDefined();
});