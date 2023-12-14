import Vendors from "../../features/Vendors/Vendors";
import DefaultAppContainerLayout from "../../shared-components/layouts/DefaultAppContainerLayout";

const Vendor=()=>{

    return(
        <DefaultAppContainerLayout>
            <div>
                <Vendors vendorClassName="mt-20 mb-14"/>
            </div>
        </DefaultAppContainerLayout>
    )
}

export default Vendor;