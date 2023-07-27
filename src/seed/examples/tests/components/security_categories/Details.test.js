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
import Details from 'seed/examples/components/security_categories/Details';

test('examples/components/security_categories/Details', () => {
  mockGql.useDetail({"securityCategory": data.GQL_SECURITY_CATEGORY});
  mockGql.useDelete({"deleteSecurityCategory": data.GQL_SECURITY_CATEGORY});
  render(<Details />);
  expect(screen).toBeDefined()
});