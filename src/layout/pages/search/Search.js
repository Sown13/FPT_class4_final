import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import ProductService from "../../../service/ProductService";
import "../../../css/layout/pages/search/Search.css";
import UserService from "../../../service/UserService";

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [displaySearchResult, setDisplaySearchResult] = useState([]);
    const [shopSearchResult, setShopSearchResult] = useState([]);
    const { search } = useParams();

    useEffect(() => {
        ProductService.getProducts().then(res => {
            const originProductList = res.data;
            const activeProductList = originProductList.filter(product => product.isActive);
            console.log("Original product list:" + originProductList);
            setSearchResult(originProductList);
            if (search === null || search === "" || search === undefined) {
                setDisplaySearchResult(activeProductList);
            } else {
                const tempSearchResult = activeProductList.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
                setDisplaySearchResult(tempSearchResult);
            }
        }).catch(error => console.error('Failed to get search result', error))
            .then(() => {
                UserService.getUsers().then(res => {
                    const searchResult = res.data;
                    console.log("Search shop result:" + searchResult);
                    if (search === null || search === "" || search === undefined) {
                        setShopSearchResult(searchResult);
                        console.log("Shop result 1:" + JSON.stringify(searchResult));
                    } else {
                        const tempResult = searchResult.filter(user => user.shopName.toLowerCase().includes(search.toLocaleLowerCase()));
                        setShopSearchResult(tempResult);
                        console.log("Shop result 1:" + searchResult);
                    }

                }).catch(error => console.error('Failed to get search shop result', error))
            })
            .catch(error => console.error('Failed to get search result', error))
    }, [search])

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSale, setMinSale] = useState(0);
    const [maxSale, setMaxSale] = useState(100);
    const [type, setType] = useState([
        "consumption", "cosmetics", "clothes"
    ]);
    const [sort, setSort] = useState("");
    const [displayShop, setDisplayShop] = useState(true);
    const [displayProductList, setDisplayProductList] = useState(true);


    const searchProduct = () => {
        let tempSearchResult = [...searchResult];
        if (maxPrice > 0) {
            tempSearchResult = searchResult.filter(product => product.price >= minPrice && product.price <= maxPrice)
        } else tempSearchResult = searchResult.filter(product => product.price >= minPrice);
        tempSearchResult = tempSearchResult
            .filter(product => product.sale >= minSale && product.sale <= maxSale)
            .filter(product => type.includes(product.type));
        console.log("sort type:" + sort);
        switch (sort) {
            case "priceDown":
                tempSearchResult.sort((product1, product2) => product2.price * (100 - product2.sale) / 100 - product1.price * (100 - product1.sale) / 100);
                break;
            case "priceUp":
                tempSearchResult.sort((product1, product2) => product1.price * (100 - product1.sale) / 100 - product2.price * (100 - product2.sale) / 100);
                break;
            case "saleDown":
                tempSearchResult.sort((product1, product2) => product2.sale - product1.sale);
                break;
            case "saleUp":
                tempSearchResult.sort((product1, product2) => product2.sale - product1.sale);
                break;
            default: break;
        }
        setDisplaySearchResult(tempSearchResult);
    }

    const activeShopOption = (e) => {
        if (e.target.checked) {
            setDisplayShop(true);
        } else
            setDisplayShop(false);
    }

    const activeProductOption = (e) => {
        if (e.target.checked) {
            setDisplayProductList(true);
        } else
            setDisplayProductList(false);
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
        searchProduct();
    }, [minPrice, maxPrice, minSale, maxSale, type, sort])

    return (
        <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-2" style={{ backgroundColor: "#f5f5f5", position: "sticky", top: "130px", height: "500px" }}>
                <h3>Search Filter</h3>
                <div>
                    <h6>Search Option</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="search-shop" defaultChecked onChange={(e) => activeShopOption(e)} />
                        <label className="form-check-label" htmlFor="search-shop">
                            Shop
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="search-product" defaultChecked onChange={(e) => activeProductOption(e)} />
                        <label className="form-check-label" htmlFor="search-product">
                            Product
                        </label>
                    </div>
                </div>
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
                {displayShop && (
                    <div className="">
                        <h3>Shop related to search</h3>
                        {shopSearchResult.map((shop, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img
                                            src={shop.shopImg}
                                            alt="Shop Image"
                                            className="card-img img-fluid"
                                            style={{ maxHeight: "168px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{shop.shopName}</h5>
                                            <p className="card-text">
                                                <strong>Shop owner: </strong>
                                                {shop.lastname} {shop.firstname}
                                            </p>
                                            <p className="card-text">Phone: {shop.phone}</p>
                                            <p className="card-text">
                                                <strong>Email:</strong> {shop.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {displayProductList && (
                    <div>
                        <h3>Product related to search</h3>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => handleInputChange(e, 'sort', e.target.value)}>
                            <option selected >Sort</option>
                            <option value="priceDown">Sort By Price DESC<i className="fa-solid fa-arrow-up"></i></option>
                            <option value="priceUp">Sort By Price ASC<i className="fa-solid fa-arrow-down"></i></option>
                            <option value="saleDown">Sort By Sale DESC</option>
                            <option value="saleUp">Sort By Sale ASC</option>
                        </select>
                        <div className="row">
                            {displaySearchResult.map((product, index) => (
                                <Link to={"/product/" + product.id} className="card col-4 d-flex flex-column" key={index} style={{ textDecoration: "none", marginBottom: "10px", boxSizing: "border-box", height: "100%" }}>
                                    <div className="no-gutters">
                                        <div className="col-md-12 flex-grow-1">
                                            <div className="card-img-top" style={{ backgroundImage: `url(${product.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", height: "0", paddingBottom: "100%" }}></div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="card-body">
                                                <h5 className="card-title text-truncate">{product.name}</h5>
                                                <p className="card-text"><strong>Type: </strong>{product.type}</p>
                                                <p className="card-text text-truncate">{product.description}</p>
                                                {product.sale > 0 ? (
                                                    <p className="card-text"><strong>Price:</strong> <del>{product.price}</del> - {product.sale}% =&gt; <span>{(product.price * (100 - product.sale) / 100).toLocaleString()}$</span></p>
                                                ) : (
                                                    <p className="card-text"><strong>Price:</strong> {product.price.toLocaleString()}</p>
                                                )}
                                                <p className="card-text"><strong>Quantity Left:</strong> {product.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}