
// const host = window.location.hostname;
// const API_BASE_URL = `http://${host}:3000/api`;
const API_BASE_URL = `http://localhost:3000/api`;

export const URLS = {
    VENDORS: {
        FETCH_LOCATION: `${API_BASE_URL}/common/fetchalllocations`,
        CREATE_VENDOR: `${API_BASE_URL}/vendors/create`,
        FETCH_VENDOR:`${API_BASE_URL}/vendors/all`,
        UPDATE_VENDOR:`${API_BASE_URL}/vendors/update`,
        DELETE_VENDOR:`${API_BASE_URL}/vendors/delete`
    },
    RESOURCES:{
        CREATE_RESOURCE: `${API_BASE_URL}/resource/create`,
        FETCH_RESOURCE:`${API_BASE_URL}/resource/search`,
        UPDATE_RESOURCE:`${API_BASE_URL}/resource/update`,
        DELETE_RESOURCE:`${API_BASE_URL}/resource/delete`
    },
    CLIENTS:{
        CREATE_CLIENT:`${API_BASE_URL}/client/create`,
        UPDATE_CLIENT:`${API_BASE_URL}/client/update`,
        FETCH_CLIENT:`${API_BASE_URL}/client/search`,
        DELETE_CLIENT:`${API_BASE_URL}/client/delete`,
        CREATE_CLIENT_REQUIREMENT:`${API_BASE_URL}/client/clientrequirement/create`,
        FETCH_CLIENT_REQUIREMENT:`${API_BASE_URL}/client/clientrequirement/search`,
        UPDATE_CLIENT_REQUIREMENT:`${API_BASE_URL}/client/clientrequirement/update`,
        DELETE_CLIENT_REQUIREMENT:`${API_BASE_URL}/client/clientrequirement/delete`,
    },
    EXPERTISE:`${API_BASE_URL}/common/getallexpertise`,
    DOWNLOAD:`${API_BASE_URL}/common/download`,
    ACCOUNT_MANAGER:`${API_BASE_URL}/accountmanager/getaccountmanager`
};
