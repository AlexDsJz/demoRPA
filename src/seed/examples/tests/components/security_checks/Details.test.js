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
import Details from 'seed/examples/components/security_checks/Details';

test('examples/components/security_checks/Details', () => {
  mockGql.useDetail({"securityCheck": data.GQL_SECURITY_CHECK});
  mockGql.useDelete({"deleteSecurityCheck": data.GQL_SECURITY_CHECK});
  render(<Details />);
  expect(screen).toBeDefined()
});