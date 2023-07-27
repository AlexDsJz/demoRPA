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
import FormSet from 'seed/examples/components/arris_forms/FormSet';

test('examples/components/arris_forms/FormSet', () => {
  mockGql.useDetail({"arrisForm": data.GQL_ARRIS_FORM});
  mockGql.useQuery({"arrisOperators": data.GQL_ARRIS_OPERATORS});
  mockGql.useSet({"setArrisForm": data.GQL_ARRIS_FORM});
  render(<FormSet />);
  expect(screen).toBeDefined();
});