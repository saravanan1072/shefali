import Icon from "../lib/svg";
import DefaultAppContainerLayout from "../shared-components/layouts/DefaultAppContainerLayout";

const Custom404=()=>{
    return(
        <DefaultAppContainerLayout>
            <div className="notFound-content">
            <Icon type="custom404"/>
            <p className="text-xl mt-12 text-center">There was an error in loading content.</p>
            </div>
            <style jsx>{`
            .notFound-content{
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50%, -50%);
            }`}</style>
        </DefaultAppContainerLayout>
    )
}

export default Custom404;