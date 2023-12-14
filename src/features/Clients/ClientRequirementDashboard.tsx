import { useEffect } from "react";
import { useDispatch} from "react-redux";
import {fetchClientRequirementData } from "../../redux/clients";
import ClientRequirementListing from "./ClientRequirementListing";

const ClientRequirementDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchClientRequirementData());
  }, []);
 
  return (
    <>
      <div className="my-20">
          <ClientRequirementListing/>
      </div>
    </>
  );
};

export default ClientRequirementDashboard;
