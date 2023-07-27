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
import FormSet from 'seed/examples/components/arris_failures/FormSet';

test('examples/components/arris_failures/FormSet', () => {
  mockGql.useDetail({"arrisFailure": data.GQL_ARRIS_FAILURE});
  mockGql.useQuery({"arrisOperators": data.GQL_ARRIS_OPERATORS});
  mockGql.useQuery({"arrisForms": data.GQL_ARRIS_FORMS});
  mockGql.useSet({"setArrisFailure": data.GQL_ARRIS_FAILURE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});