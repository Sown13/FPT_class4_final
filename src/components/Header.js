import "../css/components/Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const width = window.innerWidth; const height = window.innerHeight;
console.log(`The viewport's width is ${width} and the height is ${height}`);

export default function Header() {
    const [language, setLanguage] = useState("ENG");
    const [translation, setTranslation] = useState({});

    useEffect(() => {
        axios.get("../language/language.json").then(res => {
            console.log(`loading`);
            if (language === "ENG") {
                setTranslation(res.data.English);
            } else setTranslation(res.data.Vietnamese);
        }).catch(error => console.error('Error fetching Language', error))
    }, [language])

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    }


    return (
        <div className="header-wrapper d-flex flex-column mb-3">
            <div className="nav-bar-wrapper d-flex justify-content-center p-2">
                <nav className="navbar navbar-expand navbar1-size">
                    <div className="container-fluid" style={{paddingLeft:"0"}}>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-start" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="#">{translation.SellerCentre}</a>
                                <a className="nav-link active" href="#">
                                    {translation.StartSelling}
                                </a>
                                <a className="nav-link active" href="#">
                                    {translation.Download}
                                </a>
                                <a className="nav-link disabled" aria-disabled="true">
                                    {translation.FollowUsOn}
                                    <i class="fa-brands fa-facebook" style={{ paddingLeft: "4px", fontSize: "15px" }}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid" style={{paddingRight:"0"}}>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="#">
                                    {translation.Notifications}
                                </a>
                                <a className="nav-link active" href="#">
                                    {translation.Help}
                                </a>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown">
                                            <button className="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white", fontSize: "13px" }}>
                                                {translation.Languages}
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu">
                                                <li><button className="dropdown-item" onClick={() => handleLanguageChange("ENG")}>English</button></li>
                                                <li><button className="dropdown-item" onClick={() => handleLanguageChange("VIE")}>Vietnamese</button></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <Link className="nav-link active" to="/signup" aria-current="page" style={{ fontWeight: "600" }}>{translation.SignUp}</Link>
                                <Link className="nav-link active" to="/login" aria-current="page" style={{ fontWeight: "600" }}>{translation.Login}</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="header-with-search-bar d-flex justify-content-center p-2">
                <div className="navbar2-size row">
                    <div className="col-2 d-flex align-self-center">
                        <div className="align-bottom" style={{ paddingRight: "5px" }}>
                            <i class="fa-solid fa-bag-shopping fa-2xl" style={{ fontSize: "45px" }}></i>
                        </div>
                        <h4>Shopmee</h4>
                    </div>
                    <div className="container-fluid col-9">
                        <form className="d-flex form-style" role="search">
                            <input className="form-control me-2" type="search" placeholder={translation.Search} aria-label="Search" style={{border: "0"}}/>
                            <button className="btn btn-outline-success search-button" type="submit" ><i class="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                        <div className="d-flex justify-content-around sale" style={{paddingTop:"4px"}}>
                            <a className="nav-link" href="#" aria-current="page">Sale 20%</a>
                            <a className="nav-link" href="#" aria-current="page">Sale 40%</a>
                            <a className="nav-link" href="#" aria-current="page">Sale 50%</a>
                            <a className="nav-link" href="#" aria-current="page">Sale 60%</a>
                            <a className="nav-link" href="#" aria-current="page">Sale 80%</a>
                            <a className="nav-link" href="#" aria-current="page">Sale 90%</a>
                            <a className="nav-link" href="#" aria-current="page">0d</a>
                            <a className="nav-link" href="#" aria-current="page">FreeShip</a>
                        </div>
                    </div>
                    <div className="col-1 align-self-center">
                        <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}