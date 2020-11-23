import http from "../../app/service/config";

export default {
    findGroupById: (id) => {
        const url = "/group/id/" + id;
        return http.get(url);
    }
}