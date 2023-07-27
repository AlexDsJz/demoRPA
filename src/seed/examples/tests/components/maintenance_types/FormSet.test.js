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
import FormSet from 'seed/examples/components/maintenance_types/FormSet';

test('examples/components/maintenance_types/FormSet', () => {
  mockGql.useDetail({"maintenanceType": data.GQL_MAINTENANCE_TYPE});
  mockGql.useQuery({"maintenanceCategories": data.GQL_MAINTENANCE_CATEGORIES});
  mockGql.useSet({"setMaintenanceType": data.GQL_MAINTENANCE_TYPE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});