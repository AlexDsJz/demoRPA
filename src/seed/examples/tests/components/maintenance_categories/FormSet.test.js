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
import FormSet from 'seed/examples/components/maintenance_categories/FormSet';

test('examples/components/maintenance_categories/FormSet', () => {
  mockGql.useDetail({"maintenanceCategory": data.GQL_MAINTENANCE_CATEGORY});
  mockGql.useSet({"setMaintenanceCategory": data.GQL_MAINTENANCE_CATEGORY});
  render(<FormSet />);
  expect(screen).toBeDefined();
});