import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductService from "../../../service/ProductService";
import CartService from "../../../service/CartService";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const currentUser = "sonson2";
    const productDataToAdd = {
        userId: currentUser,
        productId: product.id,
        quantity: 1
    }


    useEffect(() => {
        ProductService.getProductById(productId).then((res) => {
            setProduct(res.data);
        }).catch(error => console.error('Failed to get product detail', error))
    }, [productId])

    const addToCart = () => {
        console.log(productDataToAdd);
        CartService.addProductToCart(productDataToAdd).then(() => {
            alert(`Added Successfully!`);
        }).catch(error => console.error('Failed to get product detail', error));
    }

    return (
        <div>
            <div class="container" style={{ marginBottom: "20px" }}>
                <h1 class="mt-4">{product.name}</h1>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <h3>Description</h3>
                        <ul>
                            {product.description}
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <img src={product.imageUrl} alt="Product" class="img-fluid" />
                    </div>
                    <div>Price: {product.price}</div>
                    <div>Quantity Left: {product.quantity}</div>
                    <div>Quantity Sold: xxx</div>
                    <button class="btn btn-primary" type="button" onClick={addToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}