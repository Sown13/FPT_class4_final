import Footer from "../components/Footer";
import HeaderLogin from "./HeaderLogin";
import "../css/auth/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserService from "../service/UserService";

export default function Login() {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    };

    const submitLogin = (values, { setSubmitting }) => {
        const validate = (values) => {
            let isValid = true;
            if (values.username === "" || values.username === null) {
                alert("Please enter a username");
                isValid = false;
            } else if (values.password === "" || values.password === null) {
                alert("Please enter a password");
                isValid = false;
            }
            return isValid;
        }
        if (validate(values)) {
            UserService.checkUser(values.username).then((res) => {
                const tempUser = res.data;
                console.log(tempUser);
                if (tempUser.password === values.password) {
                    localStorage.setItem("currentUser", JSON.stringify(tempUser));
                    alert("Login successful");
                    navigate("/");
                } else { alert("Wrong password") }
            }).catch((err) => { alert('User not exist') });
        }
    }


    return (
        <div style={{ minWidth: "1200px" }}>
            <HeaderLogin></HeaderLogin>
            <div className="login-page">
                <div className="login-form">
                    <div className="login-form-header"><h2>Log In</h2></div>
                    <div className="login-form-body">
                        <Formik initialValues={initialValues} onSubmit={submitLogin}>
                            <Form>
                                <Field name="username" class="form-control form-control-lg" type="text" placeholder="Your Phone or Email" aria-label=".form-control-lg example"
                                    style={{ fontSize: "14px", marginBottom: "28px" }} />
                                <Field name="password" class="form-control form-control-lg" type="password" placeholder="Your password" aria-label=".form-control-lg example"
                                    style={{ fontSize: "14px", marginBottom: "28px" }} />
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary login-button" type="submit">LOG IN</button>
                                </div>
                            </Form>
                        </Formik>
                        <div class="d-flex justify-content-between">
                            <Link class="me-auto p-2">Forgot password?</Link>
                            <Link class="p-2">Login with phone number</Link>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <div style={{ width: "100%", height: "1px", backgroundColor: "#dbdbdb" }}></div>
                            <div style={{ padding: "0px 4px 0px 4px", color: "#dbdbdb" }}>OR</div>
                            <div style={{ width: "100%", height: "1px", backgroundColor: "#dbdbdb" }}></div>
                        </div>
                        <div class="d-flex justify-content-center" aria-label="Social Media Buttons">
                            <button type="button" class="btn" style={{ width: "160px", boxSizing: "border-box", border: "1px solid" }}>
                                <i class="fab fa-google"></i> Google
                            </button>
                            <button type="button" class="btn" style={{ width: "160px", boxSizing: "border-box", border: "1px solid" }}>
                                <i class="fab fa-facebook"></i> Facebook
                            </button>
                        </div>
                    </div>
                    <div className="login-form-footer d-flex justify-content-center align-self-center">
                        <span style={{ color: "#a2a2a2" }}>New to Shopmee? </span>
                        <Link to={"/signup"}> Sign Up </Link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}