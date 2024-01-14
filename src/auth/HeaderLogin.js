import "../css/auth/HeaderLogin.css";
export default function HeaderLogin() {
    return (
        <div className="header-wrapper-login d-flex justify-content-center align-items-center" >
            <div className="header-login">
                <div className="d-flex align-self-center align-items-center">
                    <div className="align-bottom" style={{ paddingRight: "5px" }}>
                        <i class="fa-solid fa-bag-shopping fa-2xl" style={{ fontSize: "45px" }}></i>
                    </div>
                    <h4>Shopmee</h4>
                    <h4 style={{ color: "black", paddingLeft: "10px" }}>Login</h4>
                </div>
            </div>

        </div>
    )
}