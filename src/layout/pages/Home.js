import { useEffect, useState } from "react"
import ProductService from "../../service/ProductService";
import Product from "../../components/Product";
import { Link } from "react-router-dom";

export default function Home() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((res) => {
            setProductList(res.data);
        }).catch((err) => { console.error("Failed to fetch ", err) });
    }, [])

    return (
        <div>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" style={{ minWidth: "100%", maxWidth: "100%", height: "520px" }} data-interval="3000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://motionarray.imgix.net/preview-1847370-e7ckYzdbGvrB4i6f-large.jpg?w=660&q=60&fit=max&auto=format" class="d-block w-100" alt="..." style={{ minWidth: "100%", maxWidth: "100%", height: "500px" }} />
                        <div class="carousel-caption d-none d-md-block">
                            <Link to={"/search"} style={{ textDecoration: "none", color: "White" }}><h2>CLOTHS</h2></Link>
                            <h3 style={{color:"black"}}>Some representative placeholder content for the first slide.</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://as2.ftcdn.net/v2/jpg/04/87/18/99/1000_F_487189984_gMi84oHVh08azpPw7FpA5nFS7puxlgoj.jpg" class="d-block w-100" alt="..." style={{ minWidth: "100%", maxWidth: "100%", height: "500px" }} />
                        <div class="carousel-caption d-none d-md-block">
                            <Link to={"/search"} style={{ textDecoration: "none", color: "White" }}><h2>FOODS</h2></Link>
                            <h3 >Some representative placeholder content for the first slide.</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cosmetics-sale-banner-design-template-a1d0da0f82bb9b20822e73c3916f35cf_screen.jpg?ts=1661365942" class="d-block w-100" alt="..." style={{ minWidth: "100%", maxWidth: "100%", height: "500px" }} />
                        <div class="carousel-caption d-none d-md-block">
                            <Link to={"/search"} style={{ textDecoration: "none", color: "White" }}><h2>COSMETICS</h2></Link>
                            <h3>Some representative placeholder content for the first slide.</h3>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <h1 class="sticky-top" style={{backgroundColor:"white", borderBottom: "5px solid #f53d2d"}}>All the Products today</h1>
            {/* <div style={{ color: "#f53d2d", height: "4px", backgroundColor: "#f53d2d", marginBottom: "10px" }}></div> */}
            <div className="row">
                {productList.map((product, index) => (
                    product.isActive &&
                    (<Link to={"/product/" + product.id} className="col-lg-2 col-md-4 col-sm-12" style={{ marginBottom: "10px", textDecoration: "none", paddingRight: "0" }} key={index}>
                        <Product product={product}> </Product>
                    </Link>)
                ))}
            </div>
        </div>

    )
}