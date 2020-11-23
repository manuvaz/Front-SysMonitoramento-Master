import http from "../../app/service/config";

export default {
  removeTrigger(title, id) {
    const url = "/trigger/title/" + title + "/id/" + id;
    return http.delete(url);
  },
};
