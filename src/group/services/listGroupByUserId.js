import http from "../../app/service/config";

const url = "/group/page/1/quantityPerPage/20";

export default {
    listGroupsByUserId: () => {
        return http.get(url);
    }
}