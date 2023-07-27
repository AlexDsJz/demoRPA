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
import FormSet from 'seed/examples/components/maintenance_files/FormSet';

test('examples/components/maintenance_files/FormSet', () => {
  mockGql.useDetail({"maintenanceFile": data.GQL_MAINTENANCE_FILE});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useQuery({"maintenanceEvidences": data.GQL_MAINTENANCE_EVIDENCES});
  mockGql.useSet({"setMaintenanceFile": data.GQL_MAINTENANCE_FILE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});