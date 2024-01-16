import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductService from "../../../service/ProductService";
import "../../../css/layout/pages/search/Search.css";

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [displaySearchResult, setDisplaySearchResult] = useState([]);
    const [searchShopResult, setSearchShopResult] = useState([]);
    const { search } = useParams();

    useEffect(() => {
        ProductService.getProducts().then(res => {
            const originProductList = res.data;
            const activeProductList = originProductList.filter(product =>product.isActive);
            console.log("Original product list:" + originProductList);
            setSearchResult(originProductList);
            if (search === null || search === "" || search === undefined) {
                setDisplaySearchResult(activeProductList);
            } else {
                const tempSearchResult = activeProductList.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
                setDisplaySearchResult(tempSearchResult);
            }
        }).catch(error => console.error('Failed to get search result', error))
            .then((res) => {
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
    const [displayShop, setDisplayShop] = useState(true);
    const [displayProductList, setDisplayProductList] = useState(true);

    const searchProduct = () => {
        let tempSearchResult = searchResult;
        if (maxPrice > 0) {
            tempSearchResult = searchResult.filter(product => product.price >= minPrice && product.price <= maxPrice)
        } else tempSearchResult = searchResult.filter(product => product.price >= minPrice);
        tempSearchResult = tempSearchResult
            .filter(product => product.sale >= minSale && product.sale <= maxSale)
            .filter(product => type.includes(product.type));
        setDisplaySearchResult(tempSearchResult);
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
            default:
                break;
        };
    }

    useEffect(() => {
        console.log('input changed');
        searchProduct();
    }, [minPrice, maxPrice, minSale, maxSale, type])

    return (
        <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-2" style={{ backgroundColor: "#f5f5f5" }}>
                <h3>Search Filter</h3>
                <div>
                    <h6>Search Option</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="search-shop" />
                        <label className="form-check-label" htmlFor="search-shop">
                            Shop
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="search-product" />
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
                    <div>
                        <h3>Shop related to search</h3>
                    </div>
                )}
                {displayProductList && (
                    <div>
                        <h3>Product related to search</h3>
                        {displaySearchResult.map((product, index) => (
                            <div key={index}>
                                {product.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}