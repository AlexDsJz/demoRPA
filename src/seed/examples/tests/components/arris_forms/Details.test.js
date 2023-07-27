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
import Details from 'seed/examples/components/arris_forms/Details';

test('examples/components/arris_forms/Details', () => {
  mockGql.useDetail({"arrisForm": data.GQL_ARRIS_FORM});
  mockGql.useDelete({"deleteArrisForm": data.GQL_ARRIS_FORM});
  render(<Details />);
  expect(screen).toBeDefined()
});