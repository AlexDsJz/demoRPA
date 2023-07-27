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
import FormSet from 'seed/examples/components/security_revisions/FormSet';

test('examples/components/security_revisions/FormSet', () => {
  mockGql.useDetail({"securityRevision": data.GQL_SECURITY_REVISION});
  mockGql.useQuery({"orders": data.GQL_ORDERS});
  mockGql.useSet({"setSecurityRevision": data.GQL_SECURITY_REVISION});
  render(<FormSet />);
  expect(screen).toBeDefined();
});