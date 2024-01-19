import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ProductService from "../../../service/ProductService";
import CartService from "../../../service/CartService";
import { UserContext } from "../../../context/Context";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const { currentUser, setCurrentUser, cartCount, setCartCount } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // if (localStorage.getItem('currentUser') !== null) {
        //     const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        //     console.log(loggedUser.firstname);
        //     setCurrentUser(loggedUser);
        // };
        ProductService.getProductById(productId).then((res) => {
            setProduct(res.data);
        }).catch(error => console.error('Failed to get product detail', error))
    }, [productId])

    const addToCart = () => {
        if (currentUser !== null) {
            const productDataToAdd = {
                userId: currentUser.id,
                productId: product.id,
                quantity: 1
            }
            CartService.addProductToCart(productDataToAdd).then(() => {
                alert(`Added Successfully!` + JSON.stringify(productDataToAdd));
                const cartCountIncrease = cartCount + 1;
                console.log("COUNT: " + cartCountIncrease);
                setCartCount(cartCountIncrease);
            }).catch(error => console.error('Failed to get product detail', error));
        } else { navigate("/login") }
    }

    return (
        <div>
            {product && (
                <div class="container" style={{ marginBottom: "20px" }}>
                    <h1 class="mt-4">{product.name}</h1>
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <img
                                src={product.imageUrl}
                                alt="Product"
                                class="img-fluid"
                                style={{ maxWidth: "400px", maxHeight: "400px" }}
                            />
                        </div>
                        <div class="col-md-6">
                            <h3>Description</h3>
                            <ul>
                                <li>{product.description}</li>
                            </ul>
                            <div>Original Price: {product.price && product.price.toLocaleString()}$</div>
                            <div>Sale: {product.sale}%</div>
                            <div>
                                Sale Price:{" "}
                                {product.price &&
                                    (product.price * (100 - product.sale) / 100).toLocaleString()}
                                $
                            </div>
                            <div>Type: {product.type}</div>
                            <div>Quantity Left: {product.quantity}</div>
                            <div>Quantity Sold: xxx</div>
                            <button class="btn btn-danger" type="button" onClick={addToCart}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}