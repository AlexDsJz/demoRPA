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
import FormSet from 'seed/examples/components/maintenance_evidences/FormSet';

test('examples/components/maintenance_evidences/FormSet', () => {
  mockGql.useDetail({"maintenanceEvidence": data.GQL_MAINTENANCE_EVIDENCE});
  mockGql.useQuery({"maintenanceTypes": data.GQL_MAINTENANCE_TYPES});
  mockGql.useQuery({"maintenances": data.GQL_MAINTENANCES});
  mockGql.useSet({"setMaintenanceEvidence": data.GQL_MAINTENANCE_EVIDENCE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});