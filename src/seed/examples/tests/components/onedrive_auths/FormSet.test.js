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
import FormSet from 'seed/examples/components/onedrive_auths/FormSet';

test('examples/components/onedrive_auths/FormSet', () => {
  mockGql.useDetail({"onedriveAuth": data.GQL_ONEDRIVE_AUTH});
  mockGql.useSet({"setOnedriveAuth": data.GQL_ONEDRIVE_AUTH});
  render(<FormSet />);
  expect(screen).toBeDefined();
});