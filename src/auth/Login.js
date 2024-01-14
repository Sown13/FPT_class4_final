import Footer from "../components/Footer";
import HeaderLogin from "./HeaderLogin";
import "../css/auth/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div style={{ minWidth: "1200px" }}>
            <HeaderLogin></HeaderLogin>
            <div className="login-page">
                <div className="login-form">
                    <div className="login-form-header"><h2>Log In</h2></div>
                    <div className="login-form-body">
                        <input class="form-control form-control-lg" type="text" placeholder="Your Phone or Email" aria-label=".form-control-lg example"
                            style={{ fontSize: "14px", marginBottom: "28px" }} />
                        <input class="form-control form-control-lg" type="password" placeholder="Your password" aria-label=".form-control-lg example"
                            style={{ fontSize: "14px", marginBottom: "28px" }} />
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary login-button" type="button">LOG IN</button>
                        </div>
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
                        <span style={{ color: "#a2a2a2" }}>New to Shopee? </span>
                        <Link to={"/signup"}> Sign Up </Link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}