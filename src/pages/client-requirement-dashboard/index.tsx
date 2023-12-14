
import ClientRequirementDashboard from "../../features/Clients/ClientRequirementDashboard";
import ClientRequirements from "../../features/Clients/ClientRequirements";
import DefaultAppContainerLayout from "../../shared-components/layouts/DefaultAppContainerLayout";

const ClientRequirement=()=>{

    return(
        <DefaultAppContainerLayout>
           <ClientRequirementDashboard/>
        </DefaultAppContainerLayout>
    )
}

export default ClientRequirement;