import { useState } from "react";
import FormAddProduct from "./FormAddProduct";

export default function AddNewProduct() {
    const [isDisplayFormAdd, setIsDisplayFormAdd] = useState(false);
    const displayFormAdd = () => {
        if (isDisplayFormAdd) {
            setIsDisplayFormAdd(false);
        } else { setIsDisplayFormAdd(true); }
    }

    const currentUser = "sonson2";

    return (
        <div>
            <div className="row" style={{ marginBottom: "30px" }}>
                <div className="col-lg-2 col-md-4 col-sm-12" style={{ marginTop: "10px" }}>
                    <button onClick={displayFormAdd} className="card" style={{ maxHeight: "242px", minHeight: "242px", minWidth: "195px", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className="card-body d-flex flex-column">
                            <h6 className="card-title text-truncate">Add A New Product</h6>
                            <div className="d-flex justify-content-center align-items-center" style={{ flex: "1" }}>
                                <i className="fa-solid fa-plus" style={{ fontSize: "5rem" }}></i>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            {isDisplayFormAdd &&
                <FormAddProduct userId={currentUser}></FormAddProduct>
            }
        </div>
    )
}