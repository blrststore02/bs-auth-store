"use client";

import axios, { AxiosResponse } from 'axios';
import { RestHttpHeaders } from './restHeaders.service';
import { toast } from '@/components/bsToast';
import { useAuthGuard } from '@/library/auth.service';

const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_PORT || '9000';
const service = process.env.NEXT_PUBLIC_SERVICE || '/api/v1';
const contentType = process.env.NEXT_PUBLIC_CONTENT_TYPE || 'application/json';
const requestTimeout = process.env.NEXT_PUBLIC_TIME_OUT || '12000';

export const RestEndPService = () => {
    const headers = RestHttpHeaders();
    const user = useAuthGuard();
    const axiosInstance = axios.create({
        baseURL: `${protocol}://${host}:${port}${service}`,
        timeout: parseInt(requestTimeout)
    });

    axiosInstance.interceptors.request.use(function (config) {
        config.headers.Accept = contentType;
        config.headers['Content-Type'] = contentType;
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        if ((response && response.data && response.data.statusCode && response.data.statusCode !== 200)) {
            if([401, 500, 511].includes(response.data.statusCode)) {
                user.logoutUser();
                toast.notify(response.data.message || `Please login again. session expired!!!`);
                axios.defaults.headers.common.Authorization = null;
                headers.remove();
            } else {
                toast.notify(response.data.message || 'Unknown error encountered. Please try again after some time!!!');
            }
        }
        return Promise.resolve(response);
    }, async function (error) {
        const originalRequest = error.config;
        if ((error.response && error.response.statusCode && error.response.statusCode !== 200 && !originalRequest._retry) || (error.response && error.response.status === 401 && !originalRequest._retry) || (error.response && error.response.status === 500 && !originalRequest._retry)) {
            user.logoutUser();
            toast.notify(`Please login again. session expired!!!`);
            axios.defaults.headers.common.Authorization = null;
            headers.remove();
            originalRequest._retry = true;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    });

    const get = (path: string, params?: any): Promise<AxiosResponse> => axiosInstance.get(path, { params });
    const post = async (path: string, data: any, headers?:any): Promise<AxiosResponse> => await axiosInstance.post(path, data, headers || null);

    return { get, post };
}
