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
import FormSave from 'seed/examples/components/maintenance_evidences/FormSave';

test('examples/components/maintenance_evidences/FormSave', () => {
  mockGql.useQuery({"maintenanceTypes": data.GQL_MAINTENANCE_TYPES});
  mockGql.useQuery({"maintenances": data.GQL_MAINTENANCES});
  mockGql.useSave({"saveMaintenanceEvidence": data.GQL_MAINTENANCE_EVIDENCE});
  render(<FormSave />);
  expect(screen).toBeDefined();
});