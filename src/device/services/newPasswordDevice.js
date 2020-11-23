import http from "../../app/service/config";

export default {
    newPasswordDevice(id) {
        const url = "/device/update/password/id/" + id;
        return http.put(url);
    }
}