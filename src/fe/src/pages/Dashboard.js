import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/authContext";
import { DashContext, DashContextProvider } from "../context/dashContext";
import GET_SINGLE_PORTAL from "../ApolloClient/gql/cityPortal";
import DashboardStatus from "../components/messageBoard/DashboardStatus";

// What do we want to view on the dashboard?
// 1. messageboard
// 2. events
// 3. what's trending?

//Todo: Let's call the data first, then let's use it to render the page

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getPortalData } = useContext(DashContext);
  const { cityPortal } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const { loading, error, data } = useQuery(GET_SINGLE_PORTAL, {
    variables: {
      portalId: cityPortal,
    },
    onCompleted: (data) => {
      getPortalData(data.getSingleCityPortal);
    },
  });

  if (loading) {
    return "We stay loading";
  }

  return (
      <div>
        <DashboardStatus />
      </div>
  );
};

export default Dashboard;
