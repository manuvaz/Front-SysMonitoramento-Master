import http from "../../app/service/config";

export default {
    removeGroup(title, id) {
        const url = "/group/title/" + title + "/id/" + id;
        return http.delete(url);
    }
}