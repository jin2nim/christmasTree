import http from "../http-common";

class HttpService{
    get(fileName,path=`chistmasTree`){
        return http.get(`${path}/${fileName}`);
    }
}

export default new HttpService();