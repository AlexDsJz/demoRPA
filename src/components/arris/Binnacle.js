import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import View from "components/arris/Binnacle.view";
import { useQuery, useDetail } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

const Binnacle = ({ operatorId }) => {

  const qArrisOperator = useDetail(`{
    arrisOperator {
      turn
      user {
        firstName
        lastName
      }
      operatorArrisForms {
        createdAt
        activity
        q1
        q2
        arrisFailures {
          description
          status
          solution
          reportedSolved {
            user {
              firstName
              lastName
            }
          }
          solvedReport
        }
        arrisCraneStatuses {
          type
          name
          status
        }
        arrisFiles {
          file {
            name
            url
          }
        }
      } 
    }
  }`, operatorId);
  
  if(qArrisOperator.loading) return <Loading/>;
  if(qArrisOperator.error) return <Error/>;

  const { arrisOperator } = qArrisOperator.data;

  let operator = {
    ...arrisOperator,
    operatorArrisForms: [...arrisOperator.operatorArrisForms]
  };
  
  operator.operatorArrisForms = operator.operatorArrisForms.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return <View 
    operator={operator}
  />;
  
}

Binnacle.propTypes = {
  operatorId: PropTypes.number
};

export default Binnacle;
