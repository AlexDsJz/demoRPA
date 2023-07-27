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
import Details from 'seed/examples/components/arris_files/Details';

test('examples/components/arris_files/Details', () => {
  mockGql.useDetail({"arrisFile": data.GQL_ARRIS_FILE});
  mockGql.useDelete({"deleteArrisFile": data.GQL_ARRIS_FILE});
  render(<Details />);
  expect(screen).toBeDefined()
});