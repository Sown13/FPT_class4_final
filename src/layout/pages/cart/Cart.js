import { useContext, useEffect, useState } from "react";
import CartService from "../../../service/CartService";
import ProductService from "../../../service/ProductService";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/Context";

export default function Cart() {

    const [products, setProducts] = useState([]);
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [cart, setCart] = useState([]);
    const { currentUser, setCurrentUser, cartCount, setCartCount } = useContext(UserContext);
    let currentUserId;
    if (localStorage.getItem('currentUser') !== null) {
        const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUserId = loggedUser.id;
    };

    useEffect(() => {
        // if (localStorage.getItem('currentUser') !== null) {
        //     const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        //     console.log(loggedUser.firstname);
        //     setCurrentUser(loggedUser);
        // };
        const fetchData = async () => {
            try {
                const promises = [CartService.getCarts(currentUserId), ProductService.getProducts()];
                const [cartResult, productsResult] = await Promise.all(promises);
                const tempCart = cartResult.data;
                // const listProductId = tempCart.map(cart => cart.productId);
                // let tempListProduct = [];
                // for (let i = 0; i < listProductId.length; i++) {
                //     tempListProduct = [...tempListProduct, productsResult.data.find(product => product.id === listProductId[i])];
                //     console.log(tempListProduct);
                // }
                const tempListProduct = tempCart.map((cart)=>{
                    return {cartId: cart.id, product: productsResult.data.find(product => product.id === cart.productId)};
                });
                // console.log("list 2: " + JSON.stringify(tempListProduct));
                // console.log("list 2 products: " + tempListProduct[1].product);
                // let tempListProduct2 = listProductId2.map

                const tempTotalPrice = tempListProduct.reduce((accumulator, cart) => {
                    return accumulator + (cart.product.price * (100 - cart.product.sale) / 100);
                }, 0);
                // console.log(tempListProduct);
                setCart(tempCart);
                setProducts(tempListProduct);
                setProductsToDisplay(tempListProduct);
                setTotalPrice(tempTotalPrice);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [])

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSale, setMinSale] = useState(0);
    const [maxSale, setMaxSale] = useState(100);
    const [type, setType] = useState([
        "consumption", "cosmetics", "clothes"
    ]);
    const [sort, setSort] = useState("");


    const filterCart = (inputProducts) => {
        // console.log("inputProducts: " + inputProducts);
        let tempFilterResult;
        if (maxPrice > 0) {
            tempFilterResult = inputProducts.filter(cart => cart.product.price >= minPrice && cart.product.price <= maxPrice)
        } else tempFilterResult = inputProducts.filter(cart => cart.product.price >= minPrice);
        // console.log("Cart tempResult: " + JSON.stringify(tempFilterResult));
        tempFilterResult = tempFilterResult
            .filter(cart => cart.product.sale >= minSale && cart.product.sale <= maxSale)
            .filter(cart => type.includes(cart.product.type));
            // console.log("Cart tempResult: " + tempFilterResult);
        switch (sort) {
            case "priceDown":
                tempFilterResult.sort((cart1, cart2) => cart2.product.price * (100 - cart2.product.sale) / 100 - cart1.product.price * (100 - cart1.product.sale) / 100);
                break;
            case "priceUp":
                tempFilterResult.sort((cart1, cart2) => cart1.product.price * (100 - cart1.product.sale) / 100 - cart2.product.price * (100 - cart2.product.sale) / 100);
                break;
            case "saleDown":
                tempFilterResult.sort((cart1, cart2) => cart2.product.sale - cart1.product.sale);
                break;
            case "saleUp":
                tempFilterResult.sort((cart1, cart2) => cart2.product.sale - cart1.product.sale);
                break;
            default: break;
        }
        setProductsToDisplay(tempFilterResult);
        return tempFilterResult;
    }



    const handleInputChange = (e, inputName, value) => {
        switch (inputName) {
            case 'minPrice': setMinPrice(value);
                break;
            case 'maxPrice': setMaxPrice(value);
                break;
            case 'minSale': setMinSale(value);
                break;
            case 'maxSale': setMaxSale(value);
                break;
            case 'type': if (e.target.checked) {
                setType((prevType) => [...prevType, value]);
            } else {
                setType((prevType) => prevType.filter((item) => item !== value));
            };
                break;
            case "sort": setSort(value);
                break;
            default:
                break;
        };
    }

    useEffect(() => {
        filterCart(products);
        // console.log('filtered: display ' + productsToDisplay);
    }, [minPrice, maxPrice, minSale, maxSale, type, sort, products])

    // const findCartId = (userId, productId) => {
    //     const cartId = cart.filter(cart => cart.userId === userId && cart.productId === productId);
    //     if (cartId.length > 0) { return cartId[0].id; }
    //     else { return null; }
    // }

    const removeFromCart = (cartId) => {
        // const cartId = findCartId(currentUser.id, productId);
        // console.log('cartId to remove: ' + cartId);
        CartService.removeProductFromCart(cartId).then(
            (res) => {
                const tempProductList = products.filter(cart => cart.cartId !== cartId);
                // const tempOutputFilter = filterCart(tempProductList);
                // console.log("tempProductList " + tempProductList);
                // setProductsToDisplay(tempOutputFilter);
                setProducts(tempProductList);
                const cartCountDecrease = cartCount - 1;
                setCartCount(cartCountDecrease);
            }
        ).catch(err => { console.log(err); });
    }


    return (

        <div>
            {currentUser === null
                ? <div> You need to login first <Link className="btn btn-primary" to="/login" aria-current="page" style={{ fontWeight: "600" }}>Login</Link></div>
                : <div className="row" style={{ marginBottom: "20px" }}>
                    <div className="col-2" style={{ backgroundColor: "#f5f5f5" }}>
                        <h3>Cart Filter</h3>
                        <div>
                            <h6>By Type</h6>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="byType-consumption"
                                    onChange={(e) => handleInputChange(e, 'type', 'consumption')}
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="byType-consumption">
                                    Consumption
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="byType-cosmetics"
                                    onChange={(e) => handleInputChange(e, 'type', 'cosmetics')}
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="byType-cosmetics">
                                    Cosmetics
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="byType-clothes"
                                    onChange={(e) => handleInputChange(e, 'type', 'clothes')}
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="byType-clothes">
                                    Clothes
                                </label>
                            </div>
                        </div>
                        <div>
                            <h6>By Location</h6>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="byLocation-hanoi" />
                                <label className="form-check-label" htmlFor="byLocation-hanoi">
                                    Hanoi
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="byLocation-hochiminh" />
                                <label className="form-check-label" htmlFor="byLocation-hochiminh">
                                    Hochiminh
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="byLocation-danang" />
                                <label className="form-check-label" htmlFor="byLocation-danang">
                                    Danang
                                </label>
                            </div>
                        </div>
                        <div>
                            <h6>By Price</h6>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min"
                                    aria-label="Min"
                                    id="byPrice-min"
                                    onChange={(e) => handleInputChange(e, 'minPrice', e.target.value)}
                                />
                                <span className="input-group-text">To</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max"
                                    aria-label="Max"
                                    id="byPrice-max"
                                    onChange={(e) => handleInputChange(e, 'maxPrice', e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <h6>By Sale</h6>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min"
                                    aria-label="Min"
                                    id="bySale-min"
                                    onChange={(e) => handleInputChange(e, 'minSale', e.target.value)}
                                />
                                <span className="input-group-text">To</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max"
                                    aria-label="Max"
                                    id="bySale-max"
                                    onChange={(e) => handleInputChange(e, 'maxSale', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <h3 className="col-4">Total price: <span style={{ color: "red" }}>{totalPrice}$</span> </h3>
                            <button className="btn btn-danger col-7" > Pay </button>

                        </div>
                        <div>
                            <h3>Product related to search</h3>
                            <select className="form-select" aria-label="Default select example" onChange={(e) => handleInputChange(e, 'sort', e.target.value)}>
                                <option selected >Sort</option>
                                <option value="priceDown">Sort By Price DESC<i className="fa-solid fa-arrow-up"></i></option>
                                <option value="priceUp">Sort By Price ASC<i className="fa-solid fa-arrow-down"></i></option>
                                <option value="saleDown">Sort By Sale DESC</option>
                                <option value="saleUp">Sort By Sale ASC</option>
                            </select>
                            {productsToDisplay.map((cart, index) => (
                                <div className="card" key={index}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={cart.product.imageUrl} alt="Product" className="card-img" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <div className="position-relative">
                                                    <button className="btn btn-secondary close position-absolute top-0 end-0" aria-label="Close" onClick={() => removeFromCart(cart.cartId)}>
                                                        <span aria-hidden="true">Remove</span>
                                                    </button>
                                                </div>
                                                <h5 className="card-title">{cart.product.name}</h5>
                                                <p className="card-text"><strong>Type: </strong>{cart.product.type}</p>
                                                <p className="card-text">{cart.product.description}</p>
                                                {cart.product.sale > 0 ? (
                                                    <p className="card-text">
                                                        <strong>Price:</strong> <del>{cart.product.price}</del> - {cart.product.sale}% =&gt;{' '}
                                                        <span>{(cart.product.price * (100 - cart.product.sale)) / 100}$</span>
                                                    </p>
                                                ) : (
                                                    <p className="card-text">
                                                        <strong>Price:</strong> {cart.product.price}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}