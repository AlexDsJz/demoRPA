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
import Details from 'seed/examples/components/maintenance_files/Details';

test('examples/components/maintenance_files/Details', () => {
  mockGql.useDetail({"maintenanceFile": data.GQL_MAINTENANCE_FILE});
  mockGql.useDelete({"deleteMaintenanceFile": data.GQL_MAINTENANCE_FILE});
  render(<Details />);
  expect(screen).toBeDefined()
});