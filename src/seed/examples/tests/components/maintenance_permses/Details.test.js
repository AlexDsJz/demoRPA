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
import Details from 'seed/examples/components/maintenance_permses/Details';

test('examples/components/maintenance_permses/Details', () => {
  mockGql.useDetail({"maintenancePerms": data.GQL_MAINTENANCE_PERMS});
  mockGql.useDelete({"deleteMaintenancePerms": data.GQL_MAINTENANCE_PERMS});
  render(<Details />);
  expect(screen).toBeDefined()
});