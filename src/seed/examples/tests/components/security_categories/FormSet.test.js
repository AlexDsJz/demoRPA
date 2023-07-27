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
import FormSet from 'seed/examples/components/security_categories/FormSet';

test('examples/components/security_categories/FormSet', () => {
  mockGql.useDetail({"securityCategory": data.GQL_SECURITY_CATEGORY});
  mockGql.useSet({"setSecurityCategory": data.GQL_SECURITY_CATEGORY});
  render(<FormSet />);
  expect(screen).toBeDefined();
});