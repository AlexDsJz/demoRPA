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
import FormSave from 'seed/examples/components/evidences/FormSave';

test('examples/components/evidences/FormSave', () => {
  mockGql.useQuery({"shippings": data.GQL_SHIPPINGS});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useSave({"saveEvidence": data.GQL_EVIDENCE});
  render(<FormSave />);
  expect(screen).toBeDefined();
});