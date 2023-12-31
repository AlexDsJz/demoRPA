/*
__Seed builder__
  (Read_only) Example test
  Be careful copying content
*/

import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import List from 'seed/examples/components/arris_files/List';

test('examples/components/arris_files/List', () => {
  mockGql.usePagination({"arrisFilePagination": data.GQL_ARRIS_FILE_PAGINATION})
  render(<List />);
  expect(screen).toBeDefined()
});