import http from "../../app/service/config";

const url = "/trigger/page/1/quantityPerPage/20";

export default {
  listTriggersByUserId: () => {
    return http.get(url);
  },
};
