import React from "react";
import { dashboardValidations } from "../Dashboard/dashboardValidations";
import FormRender from "../utils/formRender";

const FilterDiv = ({ formData,btnConfig,initialStaticData,filterHandler,resetHandler }) => {

  return (
    <div className="filterDiv">
      <h3>Filters</h3>
      <div className="filter-div p-5">
        <FormRender
          formData={formData}
          formLabelStyle="mb-2 text-xs"
          formColumn={1}
          headingStyle="mt-20 mb-14"
          initialStaticData={initialStaticData}
          btnConfig={btnConfig}
          submitForm={filterHandler}
          resetFormHandler={resetHandler}
          validations={dashboardValidations}
        />
      </div>
      <style jsx>{`
        .filter-div {
          box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
          border-radius: 15px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default FilterDiv;
