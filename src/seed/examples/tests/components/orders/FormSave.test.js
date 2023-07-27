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
import FormSave from 'seed/examples/components/orders/FormSave';

test('examples/components/orders/FormSave', () => {
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useQuery({"cranes": data.GQL_CRANES});
  mockGql.useSave({"saveOrder": data.GQL_ORDER});
  render(<FormSave />);
  expect(screen).toBeDefined();
});