/*
__Seed builder__
  (Read_only) Example test
  Be careful copying content
*/

import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import List from 'seed/examples/components/onedrive_auths/List';

test('examples/components/onedrive_auths/List', () => {
  mockGql.usePagination({"onedriveAuthPagination": data.GQL_ONEDRIVE_AUTH_PAGINATION})
  render(<List />);
  expect(screen).toBeDefined()
});