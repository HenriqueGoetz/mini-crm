import axios from "axios";
import axiosInstance from "./axios";

type ApiResponse = {
  ok: boolean;
  data: any;
  status: number;
};

async function request(promise: Promise<any>): Promise<ApiResponse> {
  try {
    const response = await promise;

    return {
      ok: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        data: error.response?.data ?? null,
        status: error.response?.status ?? 500,
      };
    }

    return {
      ok: false,
      data: null,
      status: 500,
    };
  }
}

export const api = {
  get(url: string, config?: any) {
    return request(axiosInstance.get(url, config));
  },

  post(url: string, data?: any, config?: any) {
    return request(axiosInstance.post(url, data, config));
  },

  patch(url: string, data?: any, config?: any) {
    return request(axiosInstance.patch(url, data, config));
  },

  put(url: string, data?: any, config?: any) {
    return request(axiosInstance.put(url, data, config));
  },

  delete(url: string, config?: any) {
    return request(axiosInstance.delete(url, config));
  },
};
