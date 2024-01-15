import { useEffect, useState } from "react"
import ProductService from "../../../service/ProductService";
import Product from "../../../components/Product";
import { Link, Outlet } from "react-router-dom";
import "../../../css/layout/pages/ShopManager.css";

export default function ShopManager() {
    const [tabActive, setTabActive] = useState(1);

    const selectTab = (number) => {
        setTabActive(number);
    }

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className={"nav-link" + (tabActive === 1 ? " active" : "")} aria-current="page" to="/shop" onClick={() => selectTab(1)}>Your Products</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (tabActive === 2 ? " active" : "")} onClick={() => selectTab(2)} to="/shop/add">Add New</Link>
                </li>
            </ul>
            <Outlet></Outlet>
        </div>

    )
}