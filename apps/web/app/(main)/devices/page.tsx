"use client";
import { useDevices } from "graphql/queries/useDevices";
import React from "react";

export default function DevicePage() {
  const { data, loading } = useDevices();
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
}
