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
import FormSet from 'seed/examples/components/maintenances/FormSet';

test('examples/components/maintenances/FormSet', () => {
  mockGql.useDetail({"maintenance": data.GQL_MAINTENANCE});
  mockGql.useQuery({"cranes": data.GQL_CRANES});
  mockGql.useSet({"setMaintenance": data.GQL_MAINTENANCE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});