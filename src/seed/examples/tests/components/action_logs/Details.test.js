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
import Details from 'seed/examples/components/action_logs/Details';

test('examples/components/action_logs/Details', () => {
  mockGql.useDetail({"actionLog": data.GQL_ACTION_LOG});
  mockGql.useDelete({"deleteActionLog": data.GQL_ACTION_LOG});
  render(<Details />);
  expect(screen).toBeDefined()
});