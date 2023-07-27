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
import FormSet from 'seed/examples/components/cranes/FormSet';

test('examples/components/cranes/FormSet', () => {
  mockGql.useDetail({"crane": data.GQL_CRANE});
  mockGql.useSet({"setCrane": data.GQL_CRANE});
  render(<FormSet />);
  expect(screen).toBeDefined();
});