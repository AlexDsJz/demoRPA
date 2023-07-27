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
import Details from 'seed/examples/components/contents/Details';

test('examples/components/contents/Details', () => {
  mockGql.useDetail({"content": data.GQL_CONTENT});
  mockGql.useDelete({"deleteContent": data.GQL_CONTENT});
  render(<Details />);
  expect(screen).toBeDefined()
});