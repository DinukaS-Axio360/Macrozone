import axios from "axios";

//create a new instance of axios with a timeout of 15 seconds
// If the server does not respons within that time axios throws an error
export const axiosClient = axios.create({
  timeout: 15000,
  //whytimeout matters : prevents app from hanging forever on slow or broken apis , improves use experience by failing fast
});

// -------------------------
// Request Interceptor
// -------------------------
// Runs BEFORE every request is sent to the server.
axiosClient.interceptors.request.use(
  function (config) {
    console.log(
      `[REQUEST] ${String(config.method).toUpperCase()} ${config.url}`,
    );
    // Always return config.
    // Returning it tells Axios to continue sending the request.
    return config;
  },
  function (error) {
    console.error("[REQUEST ERROR]", error);
    return Promise.reject(error);
  },
);

// -------------------------
// Response Interceptor
// -------------------------
// Runs AFTER the server sends a response.
axiosClient.interceptors.response.use(
  function (response) {
    console.log(`[RESPONSE] ${response.status} ${response.config.url}`);
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    // Try to get the error message returned by the server.
    // If unavailable, use Axios's own error message.
    // If that is also unavailable, use a default message.
    const message =
      error?.response?.data?.message || error.message || "Unknown error";
    console.error(`[RESPONSE ERROR ${status} - ${message}]`);
    return Promise.reject(error);
  },
);
