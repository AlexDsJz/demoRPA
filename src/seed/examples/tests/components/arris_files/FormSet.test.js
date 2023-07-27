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
import FormSet from 'seed/examples/components/arris_files/FormSet';

test('examples/components/arris_files/FormSet', () => {
  mockGql.useDetail({"arrisFile": data.GQL_ARRIS_FILE});
  mockGql.useQuery({"arrisForms": data.GQL_ARRIS_FORMS});
  mockGql.useSet({"setArrisFile": data.GQL_ARRIS_FILE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});