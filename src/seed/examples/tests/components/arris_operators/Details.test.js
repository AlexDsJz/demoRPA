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
import Details from 'seed/examples/components/arris_operators/Details';

test('examples/components/arris_operators/Details', () => {
  mockGql.useDetail({"arrisOperator": data.GQL_ARRIS_OPERATOR});
  mockGql.useDelete({"deleteArrisOperator": data.GQL_ARRIS_OPERATOR});
  render(<Details />);
  expect(screen).toBeDefined()
});