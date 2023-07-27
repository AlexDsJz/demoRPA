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
import FormSet from 'seed/examples/components/operations/FormSet';

test('examples/components/operations/FormSet', () => {
  mockGql.useDetail({"operation": data.GQL_OPERATION});
  mockGql.useQuery({"contents": data.GQL_CONTENTS});
  mockGql.useQuery({"users": data.GQL_USERS});
  mockGql.useSet({"setOperation": data.GQL_OPERATION});
  render(<FormSet />);
  expect(screen).toBeDefined();
});