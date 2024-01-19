import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderSignup from "./HeaderSignup";
import "../css/auth/Signup.css";

export default function Signup() {

    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: ""
    };

    return (
        <div>
            <HeaderSignup></HeaderSignup>
            <div className="signup-page">
                <div className="signup-form">
                    <div className="signup-form-header"><h4>Sign Up</h4></div>
                    <div className="signup-form-body">
                        <input class="form-control form-control-lg" type="text" placeholder="Your Phone or Email" aria-label=".form-control-lg example"
                            style={{ fontSize: "14px", marginBottom: "28px" }} />
                        <input class="form-control form-control-lg" type="password" placeholder="Your Password" aria-label=".form-control-lg example"
                            style={{ fontSize: "14px", marginBottom: "28px" }} />
                        <input class="form-control form-control-lg" type="password" placeholder="Re-enter Password" aria-label=".form-control-lg example"
                            style={{ fontSize: "14px", marginBottom: "28px" }} />
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary signup-button" type="button">SIGN UP</button>
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