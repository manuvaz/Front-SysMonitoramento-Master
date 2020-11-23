import http from "../../app/service/config";

const url = "/group";

export default {
    createGroup: (group) => {
        return http.post(url,group);
    }
}