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
import FormSet from 'seed/examples/components/contents/FormSet';

test('examples/components/contents/FormSet', () => {
  mockGql.useDetail({"content": data.GQL_CONTENT});
  mockGql.useQuery({"shippings": data.GQL_SHIPPINGS});
  mockGql.useSet({"setContent": data.GQL_CONTENT});
  render(<FormSet />);
  expect(screen).toBeDefined();
});