import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchVendorData } from "../../redux/vendors";
import VendorListing from "../Vendor/VendorListing";

const VendorDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchVendorData());
  }, []);
 
  return (
    <>
      <div className="my-20">
          <VendorListing />
      </div>
    </>
  );
};

export default VendorDashboard;
