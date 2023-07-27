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
import Details from 'seed/examples/components/parts/Details';

test('examples/components/parts/Details', () => {
  mockGql.useDetail({"part": data.GQL_PART});
  mockGql.useDelete({"deletePart": data.GQL_PART});
  render(<Details />);
  expect(screen).toBeDefined()
});