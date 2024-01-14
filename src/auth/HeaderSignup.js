import { Link } from "react-router-dom";
import "../css/auth/HeaderSignup.css";
export default function HeaderSignup() {
    return (
        <div className="header-wrapper-signup d-flex justify-content-center align-items-center">

            <div className="header-signup">
                <div className="d-flex align-self-center align-items-center">
                    <Link to={"/"} className="align-bottom" style={{ paddingRight: "5px" }}>
                        <i class="fa-solid fa-bag-shopping fa-2xl" style={{ fontSize: "45px" }}></i>
                    </Link>
                    <Link to={"/"}>
                        <h4>Shopmee</h4>
                    </Link>
                    <h4 style={{ color: "black", paddingLeft: "10px" }}>Sign Up</h4>
                </div>
            </div>

        </div>
    )
}