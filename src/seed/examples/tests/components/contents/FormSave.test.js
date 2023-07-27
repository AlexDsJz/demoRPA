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
import FormSave from 'seed/examples/components/contents/FormSave';

test('examples/components/contents/FormSave', () => {
  mockGql.useQuery({"shippings": data.GQL_SHIPPINGS});
  mockGql.useSave({"saveContent": data.GQL_CONTENT});
  render(<FormSave />);
  expect(screen).toBeDefined();
});