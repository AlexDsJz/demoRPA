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
import FormSet from 'seed/examples/components/suggestions/FormSet';

test('examples/components/suggestions/FormSet', () => {
  mockGql.useDetail({"suggestion": data.GQL_SUGGESTION});
  mockGql.useQuery({"shippings": data.GQL_SHIPPINGS});
  mockGql.useQuery({"parts": data.GQL_PARTS});
  mockGql.useQuery({"orders": data.GQL_ORDERS});
  mockGql.useSet({"setSuggestion": data.GQL_SUGGESTION});
  render(<FormSet />);
  expect(screen).toBeDefined();
});