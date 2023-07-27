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
import FormSet from 'seed/examples/components/app_infos/FormSet';

test('examples/components/app_infos/FormSet', () => {
  mockGql.useDetail({"appInfo": data.GQL_APP_INFO});
  mockGql.useSet({"setAppInfo": data.GQL_APP_INFO});
  render(<FormSet />);
  expect(screen).toBeDefined();
});