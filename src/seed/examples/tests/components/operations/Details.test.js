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
import Details from 'seed/examples/components/operations/Details';

test('examples/components/operations/Details', () => {
  mockGql.useDetail({"operation": data.GQL_OPERATION});
  mockGql.useDelete({"deleteOperation": data.GQL_OPERATION});
  render(<Details />);
  expect(screen).toBeDefined()
});