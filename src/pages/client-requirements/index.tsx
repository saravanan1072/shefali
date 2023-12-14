
import ClientRequirements from "../../features/Clients/ClientRequirements";
import DefaultAppContainerLayout from "../../shared-components/layouts/DefaultAppContainerLayout";

const ClientRequirement=()=>{

    return(
        <DefaultAppContainerLayout>
            <div>
                <ClientRequirements clientRequirementsClassName="mt-20 mb-14"/>
            </div>
        </DefaultAppContainerLayout>
    )
}

export default ClientRequirement;