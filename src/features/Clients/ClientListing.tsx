import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClientData, fetchClientData } from "../../redux/clients";
import { showPopup } from "../../redux/common";
import { RootState } from "../../redux/types";
import DashboardNotFound from "../../shared-components/components/DashboardNotFound";
import VendorCard from "../Vendor/VendorCard";
import Clients from "./Clients";

const ClientListing = () => {
  const { clientArray }: any = useSelector(
    (state: any): RootState => state.client
  );
  const { loader }: any = useSelector((state: any): RootState => state.common);
  const [updateData, setUpdateData] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      if (updateData) {
        dispatch<any>(fetchClientData());
      }
    }, [updateData]);

    const updateHandler=(selectedData)=>{
        dispatch<any>(
          showPopup({
            title: "",
            description: (
              <Clients
                clientClassName="my-8"
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
      {clientArray?.length === 0 && !loader ? (
        <DashboardNotFound />
      ) : (
        clientArray.map((client, index) => {
          return (
            <div key={index}>
              <VendorCard
                Id={client._id}
                dataArr={clientArray}
                vendorName={client.clientName}
                location={client.location}
                paymentTerms={client.paymentTerms}
                contactDetails={client.contactDetails}
                accountManager={client.accountManager}
                setUpdateData={setUpdateData}
                btnArray={["Update Client","Delete Client"]}
                deleteHandlerFn={deleteClientData}
                fetchHandlerFn={fetchClientData}
                updateHandlerFn={updateHandler}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default ClientListing;
