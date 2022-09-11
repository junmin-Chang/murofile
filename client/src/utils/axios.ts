import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/user/userSlice';
import { store } from '../store/store';
export const axiosInstance = axios.create({
  baseURL: 'https://3000-junminchang-flmc-wt69i20jmeb.ws-us64.gitpod.io/',
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))}`,
  },
});

export const setUpInterceptor = (store: any) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const user = store.getState().user;
      if (user?.accessToken) {
        const decodedToken: { exp: number } = jwtDecode(user.accessToken);
        if (config.headers) {
          config.headers.authorization = `Bearer ${
            store.getState().user.accessToken
          }`;
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            await store.dispatch(refreshToken());
            config.headers.authorization = `Bearer ${
              store.getState().user.accessToken
            }`;
          }
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
};
