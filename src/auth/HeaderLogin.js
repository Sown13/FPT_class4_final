import { Link } from "react-router-dom";
import "../css/auth/HeaderLogin.css";

export default function HeaderLogin() {
    return (
        <div className="header-wrapper-login d-flex justify-content-center align-items-center" >
            <div className="header-login d-flex justify-content-between align-items-center">
                <div className="d-flex align-self-center align-items-center">
                    <Link to={"/"} className="" style={{ paddingRight: "5px" }}>
                        <i class="fa-solid fa-bag-shopping fa-2xl" style={{ fontSize: "45px" }}></i>
                    </Link>
                    <Link to={"/"}><h4>Shopmee</h4></Link>
                    <h4 style={{ color: "black", paddingLeft: "10px" }}>Login</h4>
                </div>
                <Link style={{ fontSize: "15px" }}>
                    Need help?
                </Link>
            </div>

        </div>
    )
}