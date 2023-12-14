import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../lib/svg";
import { showPopup } from "../../redux/common";
import { fetchResourceData } from "../../redux/resources";
import { RootState } from "../../redux/types";
import DashboardNotFound from "../../shared-components/components/DashboardNotFound";
import FilterDiv from "../Filters/filterDiv";
import ProfileCard from "../Profile/ProfileCard";
const ProfileListing = ({
  formData,
  btnConfig,
  initialStaticData,
  filterHandler,
  resetHandler,
}) => {
  const { resourceArray }: any = useSelector(
    (state: any): RootState => state.resource
  );
  const { loader }: any = useSelector((state: any): RootState => state.common);
  const [updateData, setUpdateData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData) {
      dispatch<any>(fetchResourceData());
    }
  }, [updateData]);

  const onFilterClick = () => {
    dispatch<any>(
      showPopup({
        title: "",
        description: (
          <FilterDiv
            formData={formData}
            btnConfig={btnConfig}
            initialStaticData={initialStaticData}
            filterHandler={filterHandler}
            resetHandler={resetHandler}
          />
        ),
        btnArray: [],
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center md:block">
        <h3>Search Results</h3>
        <p className="flex items-center md:hidden" onClick={onFilterClick} >
          Filters
          <Icon type="chevron-down" className="ml-2"/>
        </p>
      </div>

      {resourceArray?.length === 0 && !loader ? (
        <DashboardNotFound />
      ) : (
        resourceArray.map((resource, index) => {
          return (
            <div key={index}>
              <ProfileCard
                resourceId={resource._id}
                resourceName={resource.resourceName}
                experience={resource.experience}
                costing={resource.vendorCosting}
                vendor={resource.vendor?.companyName}
                technology={resource.technology}
                manager={resource.vendor?.accountManager}
                resume={resource.resume}
                setUpdateData={setUpdateData}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default ProfileListing;
