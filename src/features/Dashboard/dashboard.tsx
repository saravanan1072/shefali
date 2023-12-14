import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardFilterConfiguration,
  filterDivSubmitBtnConfig,
} from "../../constants/config";
import { saveExpertiseDetails } from "../../redux/common";
import { fetchResourceData } from "../../redux/resources";
import { RootState } from "../../redux/types";
import { technologyArray } from "../../utils";
import FilterDiv from "../Filters/filterDiv";
import ProfileListing from "../Profile/ProfileListing";

const Dashboard = () => {
  const dispatch = useDispatch();
  const common: any = useSelector((state: any): RootState => state.common);

  useEffect(() => {
    dispatch<any>(fetchResourceData());
    if (common.expertiseArray.length === 0) {
      dispatch<any>(saveExpertiseDetails());
    }
  }, []);

  const initialStaticData = {
    technology: "",
    experience: { min: 0, max: 25 },
    minBudget: "",
    maxBudget: "",
    vendorName: "",
    sortByDateType: "descending",
    teamMember: "",
  };
  const filterDataHandler = (data) => {
    const tech =
      data.technology.length > 0
        ? data.technology.map((val: string) => `${val}`).join(",")
        : "";
    const budget = data.maxBudget
      ? `${data?.minBudget || 0},${data?.maxBudget}`
      : "";
    const experience =
      Object.keys(data.experience).length !== 0
        ? `${data.experience.min},${data.experience.max}`
        : "";
    const vendor = data.vendorName ? data.vendorName : "";
    const member = data.teamMember ? data.teamMember : "";
    const filters = {
      sortByDateType: data?.sortByDateType,
      technology: tech,
      budget: budget,
      vendorName: vendor,
      teamMember: member,
      experience: experience,
    };
    dispatch<any>(fetchResourceData(filters));
  };

  const resetFiltersHandler = (formFields) => {
    let val = window.innerWidth < 769 ? true: false;
    if (!val) {
      const newObject = {};
      Object.keys(formFields).map((el) => {
        if (el !== "sortByDateType" && el !== "experience") {
          newObject[el] = formFields[el];
        }
      });
      let isEmpty = Object.values(newObject).every((el) => el === "");
      if (
        formFields.sortByDateType !== "descending" ||
        formFields.experience.min > 0 ||
        formFields.experience.max < 25 ||
        !isEmpty
      ) {
        val = true;
      }
    }
    return {
      val,
      function: fetchResourceData,
    };
  };

  const btnConfig = filterDivSubmitBtnConfig();
  const technologyList = technologyArray(common?.expertiseArray);
  const formData = dashboardFilterConfiguration(technologyList);

  return (
    <>
      <div className="my-20 block md:flex md:justify-between">
        <div className="w-full md:w-2/3">
          <ProfileListing
            formData={formData}
            btnConfig={btnConfig}
            initialStaticData={initialStaticData}
            filterHandler={filterDataHandler}
            resetHandler={resetFiltersHandler}
          />
        </div>
        <div className="hidden md:w-1/4 md:block">
          <FilterDiv
            formData={formData}
            btnConfig={btnConfig}
            initialStaticData={initialStaticData}
            filterHandler={filterDataHandler}
            resetHandler={resetFiltersHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
