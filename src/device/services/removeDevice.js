import http from "../../app/service/config";

export default {
    removeDevice(name, id) {
        const url = "/device/name/" + name + "/id/" + id;
        return http.delete(url);
    }
}