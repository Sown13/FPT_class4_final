import http from "./httpCommon";


const getUsers = () => {
    return http.get("/users");
}

const checkUser = (username) => {
    return http.get("/users/" + username);
}

const signup = (userInfo) => {
    return http.post(userInfo);
}

const UserService = {
    getUsers,
    checkUser,
    signup
}

export default UserService;