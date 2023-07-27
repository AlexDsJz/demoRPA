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
import Details from 'seed/examples/components/maintenance_evidences/Details';

test('examples/components/maintenance_evidences/Details', () => {
  mockGql.useDetail({"maintenanceEvidence": data.GQL_MAINTENANCE_EVIDENCE});
  mockGql.useDelete({"deleteMaintenanceEvidence": data.GQL_MAINTENANCE_EVIDENCE});
  render(<Details />);
  expect(screen).toBeDefined()
});