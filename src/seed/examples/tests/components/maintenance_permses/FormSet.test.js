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
import FormSet from 'seed/examples/components/maintenance_permses/FormSet';

test('examples/components/maintenance_permses/FormSet', () => {
  mockGql.useDetail({"maintenancePerms": data.GQL_MAINTENANCE_PERMS});
  mockGql.useQuery({"maintenanceCategories": data.GQL_MAINTENANCE_CATEGORIES});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useQuery({"maintenances": data.GQL_MAINTENANCES});
  mockGql.useSet({"setMaintenancePerms": data.GQL_MAINTENANCE_PERMS});
  render(<FormSet />);
  expect(screen).toBeDefined();
});