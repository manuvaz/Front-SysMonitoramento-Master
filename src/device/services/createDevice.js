import http from "../../app/service/config";

const url = "/device";
export default {
    createDevice(device) {
        return http.post(url, device);
    }
}