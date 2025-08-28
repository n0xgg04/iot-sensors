import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const GET_SENSOR_DATA = gql`
  query GetSensorData($from: DateTime!, $to: DateTime!) {
    getSensorData(from: $from, to: $to) {
      temperature
      humidity
      lux
      timestamp
    }
  }
`;

export const useSensorData = (from: Date, to: Date, timeRange?: number) => {
  const getPollInterval = () => {
    if (!timeRange) return 10000;

    if (timeRange <= 0.1) {
      return 2000;
    } else if (timeRange <= 1) {
      return 5000;
    } else if (timeRange <= 6) {
      return 10000;
    } else {
      return 30000;
    }
  };

  return useQuery(GET_SENSOR_DATA, {
    variables: { from, to },
    pollInterval: getPollInterval(),
    notifyOnNetworkStatusChange: false,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });
};
