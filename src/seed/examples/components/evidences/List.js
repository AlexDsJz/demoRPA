/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/evidences/List.view";

function EvidenceList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqEvidences = usePagination(`
  {
    evidencePagination {
      totalPages
      evidences {
        flutterPath
        createdAt
        evidenceFile { }
        shipping { }
        user { }
      }
    }
  }`, pageNum, pageSize);

  if (reqEvidences.loading) return <Loading />;
  if (reqEvidences.error) return "Error";
  const { evidences = [], totalPages = 0 } = reqEvidences.data.evidencePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    evidences={evidences}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

EvidenceList.propTypes = {};

export default EvidenceList;