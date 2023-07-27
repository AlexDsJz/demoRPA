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
import FormSave from 'seed/examples/components/security_categories/FormSave';

test('examples/components/security_categories/FormSave', () => {
  mockGql.useSave({"saveSecurityCategory": data.GQL_SECURITY_CATEGORY});
  render(<FormSave />);
  expect(screen).toBeDefined();
});