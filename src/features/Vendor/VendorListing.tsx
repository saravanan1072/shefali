import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPopup } from "../../redux/common";
import { RootState } from "../../redux/types";
import { deleteVendorData, fetchVendorData } from "../../redux/vendors";
import DashboardNotFound from "../../shared-components/components/DashboardNotFound";
import Vendors from "../Vendors/Vendors";
import VendorCard from "./VendorCard";
const VendorListing = () => {
  const { vendorArray }: any = useSelector(
    (state: any): RootState => state.vendor
  );
  const { loader }: any = useSelector((state: any): RootState => state.common);
  const [updateData, setUpdateData] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      if (updateData) {
        dispatch<any>(fetchVendorData());
      }
    }, [updateData]);

    const updateHandler=(selectedData)=>{
      dispatch<any>(
        showPopup({
          title: "",
          description: (
            <Vendors
              vendorClassName="my-8"
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
      {vendorArray?.length === 0 && !loader ? (
        <DashboardNotFound />
      ) : (
        vendorArray.map((vendor, index) => {
          return (
            <div key={index}>
              <VendorCard
                Id={vendor._id}
                dataArr={vendorArray}
                vendorName={vendor.companyName}
                location={vendor.location}
                expertise={vendor.expertise}
                contactDetails={vendor.contactDetails}
                accountManager={vendor.accountManager}
                setUpdateData={setUpdateData}
                btnArray={["Update Vendor","Delete Vendor"]}
                deleteHandlerFn={deleteVendorData}
                fetchHandlerFn={fetchVendorData}
                updateHandlerFn={updateHandler}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default VendorListing;
