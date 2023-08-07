import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/authContext";
import { DashContext } from "../../context/dashContext";
import GET_SINGLE_PORTAL from "../../ApolloClient/gql/cityPortal";

// What do we want to view on the dashboard status view?
// 1. display city and state name
// 2. current users active
// 3. what's trending?

//Todo: Let's call context first

const DashboardStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { city, state, users, messageBoardId } =
    useContext(DashContext);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isLoading) {
      return "We stay loading";
    }
  }, [isLoading])

  return (
    <div>
      <h1>
        Welcome to {city}, {state}
      </h1>
      <div>
        <p>
          There are currently {users.length} users active in your City Portal.
        </p>
      </div>
    </div>
  );
};

export default DashboardStatus;
