import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/layout/Layout.css";
import { useEffect, useState } from "react";
import { UserContext } from "../context/Context";
import CartService from "../service/CartService";

export default function Layout() {
    const [currentUser, setCurrentUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    let currentUserId = null;
    if (localStorage.getItem('currentUser') !== null) {
        const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUserId = loggedUser.id;
    };


    useEffect(() => {
        if (localStorage.getItem('currentUser') !== null) {
            const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
            console.log(loggedUser.firstname);
            setCurrentUser(loggedUser);
        };
        if (currentUserId !== null) {
            CartService.getCarts(currentUserId).then((res) => {
                const count = res.data.length;
                setCartCount(count);
            })
        }
    }, [currentUserId])

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    return (
        <div>
            <ScrollToTop />
            <UserContext.Provider value={{ currentUser, setCurrentUser, cartCount, setCartCount }}>
                <Header></Header>
                <div className="d-flex justify-content-center">
                    <div className="outlet">
                        <Outlet></Outlet>
                    </div>
                </div>
                <Footer></Footer>
            </UserContext.Provider>
        </div>
    )
}