import http from "../../app/service/config";

export default {
  findTriggerById: (id) => {
    const url = "/trigger/id/" + id;
    return http.get(url);
  },
};
