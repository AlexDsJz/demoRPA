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
import FormSave from 'seed/examples/components/items/FormSave';

test('examples/components/items/FormSave', () => {
  mockGql.useQuery({"parts": data.GQL_PARTS});
  mockGql.useSave({"saveItem": data.GQL_ITEM});
  render(<FormSave />);
  expect(screen).toBeDefined();
});