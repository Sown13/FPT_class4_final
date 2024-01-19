import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/Context";
import UserService from "../../../service/UserService";
import { Link, useNavigate } from "react-router-dom";

export default function ApplySeller() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    console.log("currentUser:  ", currentUser);

    const initialValues = {
        id: currentUser !== null ? currentUser.id : "",
        isShopActive: currentUser !== null ? true : false,
        shopName: "",
        shopImg: ""
    }

    const submitSeller = (values) => {
        UserService.submitSeller(values).then(() => {
            alert("Submit success!");
            const updatedUser = { ...currentUser, isShopActive: true };
            setCurrentUser(updatedUser);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            // navigate("/shop")
        }).catch((err) => { alert('Oops! Something error!') });
    }
    return (
        <div>
            {currentUser === null
                ? <div> You need to login first <Link className="btn btn-primary" to="/login" aria-current="page" style={{ fontWeight: "600" }}>Login</Link></div>
                : (currentUser.isShopActive
                    ?
                    <div>
                        Your Seller Request Is Approved
                        <Link to={"/shop"}> Go To Seller Centre</Link>
                    </div>
                    :
                    <Formik initialValues={initialValues} onSubmit={submitSeller}>
                        <Form>
                            <Field class="form-control form-control-lg" type="text" name="shopName" placeholder="Your Shop Name" aria-label=".form-control-lg example"
                                style={{ fontSize: "14px", marginBottom: "28px" }} />
                            <Field class="form-control form-control-lg" type="text" name="shopImg" placeholder="Your Shop Image" aria-label=".form-control-lg example"
                                style={{ fontSize: "14px", marginBottom: "28px" }} />
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Submitting this application means you have accepted our terms
                                </label>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary signup-button" type="submit">Apply To Become Seller</button>
                            </div>
                        </Form>
                    </Formik>)}
        </div>
    )
}