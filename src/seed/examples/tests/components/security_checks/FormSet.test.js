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
import FormSet from 'seed/examples/components/security_checks/FormSet';

test('examples/components/security_checks/FormSet', () => {
  mockGql.useDetail({"securityCheck": data.GQL_SECURITY_CHECK});
  mockGql.useQuery({"securityCheckTypes": data.GQL_SECURITY_CHECK_TYPES});
  mockGql.useQuery({"securityRevisions": data.GQL_SECURITY_REVISIONS});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useSet({"setSecurityCheck": data.GQL_SECURITY_CHECK});
  render(<FormSet />);
  expect(screen).toBeDefined();
});