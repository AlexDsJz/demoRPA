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
import FormSave from 'seed/examples/components/maintenance_permses/FormSave';

test('examples/components/maintenance_permses/FormSave', () => {
  mockGql.useQuery({"maintenanceCategories": data.GQL_MAINTENANCE_CATEGORIES});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useQuery({"maintenances": data.GQL_MAINTENANCES});
  mockGql.useSave({"saveMaintenancePerms": data.GQL_MAINTENANCE_PERMS});
  render(<FormSave />);
  expect(screen).toBeDefined();
});