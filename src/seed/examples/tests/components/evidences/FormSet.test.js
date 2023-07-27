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
import FormSet from 'seed/examples/components/evidences/FormSet';

test('examples/components/evidences/FormSet', () => {
  mockGql.useDetail({"evidence": data.GQL_EVIDENCE});
  mockGql.useQuery({"shippings": data.GQL_SHIPPINGS});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useSet({"setEvidence": data.GQL_EVIDENCE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});