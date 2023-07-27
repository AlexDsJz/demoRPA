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
import Details from 'seed/examples/components/suggestions/Details';

test('examples/components/suggestions/Details', () => {
  mockGql.useDetail({"suggestion": data.GQL_SUGGESTION});
  mockGql.useDelete({"deleteSuggestion": data.GQL_SUGGESTION});
  render(<Details />);
  expect(screen).toBeDefined()
});