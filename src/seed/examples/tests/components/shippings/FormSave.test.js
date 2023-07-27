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
import FormSave from 'seed/examples/components/shippings/FormSave';

test('examples/components/shippings/FormSave', () => {
  mockGql.useQuery({"orders": data.GQL_ORDERS});
  mockGql.useSave({"saveShipping": data.GQL_SHIPPING});
  render(<FormSave />);
  expect(screen).toBeDefined();
});