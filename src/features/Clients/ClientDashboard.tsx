import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchClientData } from "../../redux/clients";
import ClientListing from "./ClientListing";

const ClientDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchClientData());
  }, []);
 
  return (
    <>
      <div className="my-20">
          <ClientListing/>
      </div>
    </>
  );
};

export default ClientDashboard;
