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
import Details from 'seed/examples/components/maintenance_categories/Details';

test('examples/components/maintenance_categories/Details', () => {
  mockGql.useDetail({"maintenanceCategory": data.GQL_MAINTENANCE_CATEGORY});
  mockGql.useDelete({"deleteMaintenanceCategory": data.GQL_MAINTENANCE_CATEGORY});
  render(<Details />);
  expect(screen).toBeDefined()
});