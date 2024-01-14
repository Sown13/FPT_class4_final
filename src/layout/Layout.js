import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/layout/Layout.css";

export default function Layout() {
    return (
        <div>
            <Header></Header>
            <div className="d-flex justify-content-center">
                <div className="outlet">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}