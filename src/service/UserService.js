import http from "./httpCommon";


const checkUser = (username) => {
    return http.get("/users/" + username);
}

const signup = (userInfo) => {
    return http.post(userInfo);
}

const UserService = {
    checkUser,
    signup
}

export default UserService;