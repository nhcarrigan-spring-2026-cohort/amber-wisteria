import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');
        const res = await axiosClient.post('/api/auth/token/refresh/', { refresh: refreshToken });

        const newAccessToken = res.data.access;
        const newRefreshToken = res.data.refresh;

        localStorage.setItem('access', newAccessToken);
        localStorage.setItem('refresh', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (error) {
        console.log(error);

        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
