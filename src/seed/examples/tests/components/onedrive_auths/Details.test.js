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
import Details from 'seed/examples/components/onedrive_auths/Details';

test('examples/components/onedrive_auths/Details', () => {
  mockGql.useDetail({"onedriveAuth": data.GQL_ONEDRIVE_AUTH});
  mockGql.useDelete({"deleteOnedriveAuth": data.GQL_ONEDRIVE_AUTH});
  render(<Details />);
  expect(screen).toBeDefined()
});