import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderSignup from "./HeaderSignup";
import "../css/auth/Signup.css";
import { Field, Form, Formik } from "formik";
import UserService from "../service/UserService";
import { useState } from "react";

export default function Signup() {
    const [passwordConfirm, setConfirmPassword] = useState();

    const navigate = useNavigate();
    const initialValues = {
        id: "",
        password: "",
        email: "",
        firstname: "New User",
        lastname: "None",
        phone: "",
        role: "USER",
        currentRole: "NONE",
        shopName: "",
        shopImg: "",
        isShopActive: false
    };

    const handleConfirmPasswordChange = (password) => {
        setConfirmPassword(password);
    }

    const submitSignup = (values) => {
        const validate = (data) => {
            let isValid = true;
            if (data.username === "" || data.username === null) {
                alert("Please enter a username");
                isValid = false;
            } else if (data.password === "" || data.password === null) {
                alert("Please enter a password");
                isValid = false;
            } else if (passwordConfirm === "" || passwordConfirm === null) {
                alert("Please confirm your password");
                isValid = false;
            } else if (passwordConfirm !== data.password) {
                alert("Your confirm-password is not match: " + passwordConfirm);
                isValid = false;
            }
            return isValid;
        }
        if (validate(values)) {
            UserService.checkUser(values.id).then((res) => {
                alert("Username existed!");
            }).catch((err) => {
                UserService.signup(values).then((res) => {
                    alert("Signup successful!");
                    navigate("/login");
                })
            });
        }
    }

    return (
        <div>
            <HeaderSignup></HeaderSignup>
            <div className="signup-page">
                <div className="signup-form">
                    <div className="signup-form-header"><h4>Sign Up</h4></div>
                    <div className="signup-form-body">
                        <Formik initialValues={initialValues} onSubmit={submitSignup}>
                            <Form>
                                <Field class="form-control form-control-lg" type="text" name="id" placeholder="Your Phone or Email" aria-label=".form-control-lg example"
                                    style={{ fontSize: "14px", marginBottom: "28px" }} />
                                <Field class="form-control form-control-lg" type="password" name="password" placeholder="Your Password" aria-label=".form-control-lg example"
                                    style={{ fontSize: "14px", marginBottom: "28px" }} />
                                <input class="form-control form-control-lg" type="password" name="passwordConfirm" onChange={(e) => handleConfirmPasswordChange(e.target.value)} placeholder="Re-enter Password" aria-label=".form-control-lg example"
                                    style={{ fontSize: "14px", marginBottom: "28px" }} />
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary signup-button" type="submit">SIGN UP</button>
                                </div>
                            </Form>
                        </Formik>

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
                    <div className="signup-form-footer d-flex justify-content-center align-self-center">
                        <span style={{ color: "#a2a2a2" }}>Have an account? </span>
                        <Link to={"/login"}> Log In </Link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}