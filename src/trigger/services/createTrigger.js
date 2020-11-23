import http from "../../app/service/config";

const url = "/trigger";

export default {
  createTrigger: (trigger) => {
    return http.post(url, trigger);
  },
};
