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
import Details from 'seed/examples/components/security_check_types/Details';

test('examples/components/security_check_types/Details', () => {
  mockGql.useDetail({"securityCheckType": data.GQL_SECURITY_CHECK_TYPE});
  mockGql.useDelete({"deleteSecurityCheckType": data.GQL_SECURITY_CHECK_TYPE});
  render(<Details />);
  expect(screen).toBeDefined()
});