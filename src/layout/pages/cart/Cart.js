import { useEffect, useState } from "react";
import CartService from "../../../service/CartService";
import ProductService from "../../../service/ProductService";

export default function Cart() {

    const [products, setProducts] = useState([]);
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [cart, setCart] = useState([]);
    const currentUser = "sonson2";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = [CartService.getCarts(currentUser), ProductService.getProducts()];
                const [cartResult, productsResult] = await Promise.all(promises);
                const tempCart = cartResult.data;
                const listProductId = tempCart.map(product => product.productId);
                const tempListProduct = productsResult.data.filter(product => listProductId.includes(product.id));
                const tempTotalPrice = tempListProduct.reduce((accumulator, product) => {
                    return accumulator + (product.price * (100 - product.sale) / 100);
                }, 0);
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


    const filterCart = () => {
        let tempFilterResult;
        if (maxPrice > 0) {
            tempFilterResult = products.filter(product => product.price >= minPrice && product.price <= maxPrice)
        } else tempFilterResult = products.filter(product => product.price >= minPrice);
        tempFilterResult = tempFilterResult
            .filter(product => product.sale >= minSale && product.sale <= maxSale)
            .filter(product => type.includes(product.type));
        console.log("sort type:" + sort);
        switch (sort) {
            case "priceDown":
                tempFilterResult.sort((product1, product2) => product2.price * (100 - product2.sale) / 100 - product1.price * (100 - product1.sale) / 100);
                break;
            case "priceUp":
                tempFilterResult.sort((product1, product2) => product1.price * (100 - product1.sale) / 100 - product2.price * (100 - product2.sale) / 100);
                break;
            case "saleDown":
                tempFilterResult.sort((product1, product2) => product2.sale - product1.sale);
                break;
            case "saleUp":
                tempFilterResult.sort((product1, product2) => product2.sale - product1.sale);
                break;
            default: break;
        }
        setProductsToDisplay(tempFilterResult);
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
        console.log("sort type:" + sort);
        filterCart();
    }, [minPrice, maxPrice, minSale, maxSale, type, sort, products])

    const findCardId = (userId, productId) => {
        const cardId = cart.filter(cart => cart.userId === userId && cart.productId === productId);
        if (cardId.length > 0) { return cardId[0].id; }
        else { return null; }
    }

    const removeFromCart = (productId) => {
        const cardId = findCardId(currentUser, productId);
        CartService.removeProductFromCart(cardId).then(
            (res) => {
                const tempProductList = products.filter(product => product.id !== productId);
                setProducts(tempProductList);
            }
        ).catch(err => { console.log(err); });
    }


    return (
        <div className="row" style={{ marginBottom: "20px" }}>
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
                    <button className="btn btn-primary col-7" > Pay </button>

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
                    {productsToDisplay.map((product, index) => (
                        <div className="card" key={index}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={product.imageUrl} alt="Product" className="card-img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="position-relative">
                                            <button className="btn btn-danger close position-absolute top-0 end-0" aria-label="Close" onClick={() => removeFromCart(product.id)}>
                                                <span aria-hidden="true">Remove</span>
                                            </button>
                                        </div>
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text"><strong>Type: </strong>{product.type}</p>
                                        <p className="card-text">{product.description}</p>
                                        {product.sale > 0 ? (
                                            <p className="card-text">
                                                <strong>Price:</strong> <del>{product.price}</del> - {product.sale}% =&gt;{' '}
                                                <span>{(product.price * (100 - product.sale)) / 100}$</span>
                                            </p>
                                        ) : (
                                            <p className="card-text">
                                                <strong>Price:</strong> {product.price}
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
    )
}