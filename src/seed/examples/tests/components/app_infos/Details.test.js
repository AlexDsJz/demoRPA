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
import Details from 'seed/examples/components/app_infos/Details';

test('examples/components/app_infos/Details', () => {
  mockGql.useDetail({"appInfo": data.GQL_APP_INFO});
  mockGql.useDelete({"deleteAppInfo": data.GQL_APP_INFO});
  render(<Details />);
  expect(screen).toBeDefined()
});