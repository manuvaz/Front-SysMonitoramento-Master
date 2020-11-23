import http from "./config";

const url = "/user/authenticate";

export default {
    authenticate: (user) => {
        return http.post(url, user);
    }
}
