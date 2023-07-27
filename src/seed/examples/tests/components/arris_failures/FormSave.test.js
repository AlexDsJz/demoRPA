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
import FormSave from 'seed/examples/components/arris_failures/FormSave';

test('examples/components/arris_failures/FormSave', () => {
  mockGql.useQuery({"arrisOperators": data.GQL_ARRIS_OPERATORS});
  mockGql.useQuery({"arrisForms": data.GQL_ARRIS_FORMS});
  mockGql.useSave({"saveArrisFailure": data.GQL_ARRIS_FAILURE});
  render(<FormSave />);
  expect(screen).toBeDefined();
});