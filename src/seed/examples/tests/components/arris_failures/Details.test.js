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
import Details from 'seed/examples/components/arris_failures/Details';

test('examples/components/arris_failures/Details', () => {
  mockGql.useDetail({"arrisFailure": data.GQL_ARRIS_FAILURE});
  mockGql.useDelete({"deleteArrisFailure": data.GQL_ARRIS_FAILURE});
  render(<Details />);
  expect(screen).toBeDefined()
});