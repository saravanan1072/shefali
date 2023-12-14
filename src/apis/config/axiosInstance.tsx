
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getError } from '../../utils';


const axiosInstance: AxiosInstance = Axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // default base url
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const isNetworkError = (error: any): boolean => {
    return !error.response && error.message && error.message.includes('Network Error');
};

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Do something before request is sent

        return config;
    },
    (error: any) => {
        throw new Error(error.request.data.message);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Do something with response data
        return response.data;
    },
    (error: any) => {
        let errorMessage: string;
        if (isNetworkError(error)) {
            errorMessage = 'Server Not Reachable';
        } else if (error.response) {
            errorMessage = getError(error.response.status).errorMessage;
        } else {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
);

export default axiosInstance;
