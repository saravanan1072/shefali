import React from "react";
import ClientDashboard from "../../features/Clients/ClientDashboard";
import DefaultAppContainerLayout from "../../shared-components/layouts/DefaultAppContainerLayout";

const Resource = () => {
  return (
    <DefaultAppContainerLayout>
      <ClientDashboard/>
    </DefaultAppContainerLayout>
  );
};

export default Resource;
