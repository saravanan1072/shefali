export const INITIAL_COMMON_STATE: CommonState = {
  locationArray: [],
  expertiseArray: [],
  accountManagerArray:[],
  popup: {
    visible: false,
    messageData: {
      title: "",
      description: "",
      btnArray: [],
    },
    classAdditions:{}
  },
  formBtnClicked: false,
  loader:false,
  toaster:{
    visible:false,
    messageData:""
  },
  hamburger:false,
  newEntry:false
};

export interface CommonState {
  locationArray: LocationArr[];
  expertiseArray: string[];
  accountManagerArray:any[],
  popup: {
    visible: boolean;
    messageData: {
      title: string;
      description: string;
      btnArray: Array<any>;
    };
    classAdditions:any;
  };
  formBtnClicked: boolean;
  loader:boolean;
  toaster:{
    visible:boolean;
    messageData:any;
  }
  hamburger:boolean;
  newEntry:boolean;
}

export interface LocationArr {
  name: string;
  state: string;
}
