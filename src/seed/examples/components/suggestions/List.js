/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/suggestions/List.view";

function SuggestionList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqSuggestions = usePagination(`
  {
    suggestionPagination {
      totalPages
      suggestions {
        quantity
        elevationNumber
        createdAt
        shipping { }
        part { }
        order { }
      }
    }
  }`, pageNum, pageSize);

  if (reqSuggestions.loading) return <Loading />;
  if (reqSuggestions.error) return "Error";
  const { suggestions = [], totalPages = 0 } = reqSuggestions.data.suggestionPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    suggestions={suggestions}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

SuggestionList.propTypes = {};

export default SuggestionList;