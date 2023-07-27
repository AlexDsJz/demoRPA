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
import FormSave from 'seed/examples/components/maintenance_types/FormSave';

test('examples/components/maintenance_types/FormSave', () => {
  mockGql.useQuery({"maintenanceCategories": data.GQL_MAINTENANCE_CATEGORIES});
  mockGql.useSave({"saveMaintenanceType": data.GQL_MAINTENANCE_TYPE});
  render(<FormSave />);
  expect(screen).toBeDefined();
});