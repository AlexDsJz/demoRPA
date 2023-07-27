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
import FormSave from 'seed/examples/components/parts/FormSave';

test('examples/components/parts/FormSave', () => {
  mockGql.useSave({"savePart": data.GQL_PART});
  render(<FormSave />);
  expect(screen).toBeDefined();
});