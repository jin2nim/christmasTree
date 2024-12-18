import http from "../http-common";

class HttpService {
    get(fileName, path = `chistmasTree`) {
        return http.get(`${path}/${fileName}`);
    }
    addLog(data) {
        return http.post("auditLogAll", data);
    }
}

export default new HttpService();