import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Device } from "graphql/__generated__/graphql";

const DEVICE_QUERY = gql`
  query Devices {
    devices {
      id
      name
      sensor_id
      port
      location
      created_at
      updated_at
      status
    }
  }
`;

export const useDevices = () => useQuery<Device>(DEVICE_QUERY);
