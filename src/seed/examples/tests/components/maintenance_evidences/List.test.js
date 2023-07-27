/*
__Seed builder__
  (Read_only) Example test
  Be careful copying content
*/

import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import List from 'seed/examples/components/maintenance_evidences/List';

test('examples/components/maintenance_evidences/List', () => {
  mockGql.usePagination({"maintenanceEvidencePagination": data.GQL_MAINTENANCE_EVIDENCE_PAGINATION})
  render(<List />);
  expect(screen).toBeDefined()
});