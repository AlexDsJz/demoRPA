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
import FormSave from 'seed/examples/components/maintenance_categories/FormSave';

test('examples/components/maintenance_categories/FormSave', () => {
  mockGql.useSave({"saveMaintenanceCategory": data.GQL_MAINTENANCE_CATEGORY});
  render(<FormSave />);
  expect(screen).toBeDefined();
});