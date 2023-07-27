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
import Details from 'seed/examples/components/evidences/Details';

test('examples/components/evidences/Details', () => {
  mockGql.useDetail({"evidence": data.GQL_EVIDENCE});
  mockGql.useDelete({"deleteEvidence": data.GQL_EVIDENCE});
  render(<Details />);
  expect(screen).toBeDefined()
});