
import Clients from "../../features/Clients/Clients";
import DefaultAppContainerLayout from "../../shared-components/layouts/DefaultAppContainerLayout";

const Client=()=>{

    return(
        <DefaultAppContainerLayout>
            <div>
                <Clients clientClassName="mt-20 mb-14"/>
            </div>
        </DefaultAppContainerLayout>
    )
}

export default Client;