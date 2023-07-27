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
import FormSave from 'seed/examples/components/security_check_types/FormSave';

test('examples/components/security_check_types/FormSave', () => {
  mockGql.useQuery({"securityCategories": data.GQL_SECURITY_CATEGORIES});
  mockGql.useSave({"saveSecurityCheckType": data.GQL_SECURITY_CHECK_TYPE});
  render(<FormSave />);
  expect(screen).toBeDefined();
});