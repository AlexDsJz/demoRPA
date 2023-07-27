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
import Details from 'seed/examples/components/maintenances/Details';

test('examples/components/maintenances/Details', () => {
  mockGql.useDetail({"maintenance": data.GQL_MAINTENANCE});
  mockGql.useDelete({"deleteMaintenance": data.GQL_MAINTENANCE});
  render(<Details />);
  expect(screen).toBeDefined()
});