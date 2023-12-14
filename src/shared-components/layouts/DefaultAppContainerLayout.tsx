import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideHamburgerMenu, hidePopup, resetSubmitClick } from "../../redux/common";
import { RootState } from "../../redux/types";
import Loader from "../components/LoadingScreen";
import Popup from "../components/Popup";
import Header from "../ui/Header";
import Toaster from "../ui/Toaster";

const DefaultAppContainerLayout = ({ children }): JSX.Element => {
  const common = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const commonState: any = useSelector((state: any): RootState => state.common);

  useEffect(()=>{
    if(commonState.hamburger){
      dispatch<any>(hideHamburgerMenu());
    }
  },[]);

  useEffect(() => {
    if (commonState.formBtnClicked && commonState.popup.visible) {
      dispatch<any>(hidePopup());
      dispatch<any>(resetSubmitClick());
    }
  }, [commonState.formBtnClicked]);

  return (
    <div className={`${commonState.hamburger?"ml-0 mr-5":"mx-5"} md:mx-12 lg:mx-40`}>
      <Header />
      <div>{children}</div>
      <Popup
        open={common.popup.visible}
        messageData={common.popup.messageData}
        classAdditions={common.popup.classAdditions}
        closePopup={() => {
          dispatch<any>(hidePopup());
        }}
      />
       <Toaster open={common.toaster.visible} messageData={common.toaster.messageData} />
      <Loader showLoader={common.loader}/>
    </div>
  );
};

export default DefaultAppContainerLayout;
