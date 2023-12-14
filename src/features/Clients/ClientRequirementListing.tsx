import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClientData, deleteClientRequirementData, fetchClientData, fetchClientRequirementData } from "../../redux/clients";
import { showPopup } from "../../redux/common";
import { RootState } from "../../redux/types";
import DashboardNotFound from "../../shared-components/components/DashboardNotFound";
import VendorCard from "../Vendor/VendorCard";
import ClientRequirements from "./ClientRequirements";

const ClientRequirementListing = () => {
  const { clientRequirementArray}: any = useSelector(
    (state: any): RootState => state.client
  );
  const { loader }: any = useSelector((state: any): RootState => state.common);
  const [updateData, setUpdateData] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      if (updateData) {
        dispatch<any>(fetchClientRequirementData());
      }
    }, [updateData]);

    const updateHandler=(selectedData)=>{
        dispatch<any>(
          showPopup({
            title: "",
            description: (
              <ClientRequirements
                clientRequirementsClassName="my-8"
                prefilledVals={selectedData}
                setUpdateData={setUpdateData}
              />
            ),
            btnArray: [],
          })
        );
      }

  return (
    <>
      <h3>Search Results</h3>
      {clientRequirementArray?.length === 0 && !loader ? (
        <DashboardNotFound />
      ) : (
        clientRequirementArray.map((client, index) => {
          return (
            <div key={index}>
              <VendorCard
                Id={client._id}
                dataArr={clientRequirementArray}
                vendorName={client.clientName.clientName}
                contactDetails={client.clientName.contactDetails}
                expertise={client.technology}
                experience={client.experience}
                budget={client.budget}
                contractDuration={client.contractDuration}
                openPositions={client.openPositions}
                workLocation={client.workLocation}
                setUpdateData={setUpdateData}
                btnArray={["Update Client Requirement","Delete Client Requirement"]}
                deleteHandlerFn={deleteClientRequirementData}
                fetchHandlerFn={fetchClientRequirementData}
                updateHandlerFn={updateHandler}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default ClientRequirementListing;
