import http from "./httpCommon";


const getUsers = () => {
    return http.get("/users");
}

const checkUser = (username) => {
    return http.get("/users/" + username);
}

const signup = (userInfo) => {
    return http.post("/users",userInfo);
}

const submitSeller = (user) => {
    return http.patch(`/users/${user.id}`,user);
}

const UserService = {
    getUsers,
    checkUser,
    signup,
    submitSeller
}

export default UserService;