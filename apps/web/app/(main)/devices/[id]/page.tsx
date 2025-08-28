import React from "react";

export default async function DeviceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>DeviceEditPage {id}</div>;
}
