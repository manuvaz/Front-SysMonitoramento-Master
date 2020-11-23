import http from "../../app/service/config";

export default {
    findPassword(id) {
        const url = "/device/id/" + id;
        return http.get(url);
    }
}