import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {logDOM} from "@testing-library/react";


class ProductListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenMenu:false,
            currentPage: 1,
            productsPerPage: 12,
            searchBrand: '',
            searchModel:'',
            selectedBrands: [],
            selectedModels: [],
            sortOption: '',
            priceSort: '',
            totalPrice: 0,
            cartItems: [],
            selectedProduct:[]
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
    }

    openMenu=()=>{
        this.setState({
            isOpenMenu:!this.state.isOpenMenu
        })
        if (this.state.isOpenMenu === false) {
            document.body.classList.add("no-scroll");
        }
        else{
          //  document.body.classList.remove("no-scroll");
        }
    }

    closeMenu=()=>{
        this.setState({
            isOpenMenu:false
        })
       let bodyElement=document.body;
        if (bodyElement.classList.contains("no-scroll")) {
            bodyElement.classList.remove("no-scroll");
        }

    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber,
        });
    }
    handleNextPage() {
        const { currentPage, productsPerPage } = this.state;
        const { products } = this.props;
        const totalPages = Math.ceil(products.length / productsPerPage);

        if (currentPage < totalPages) {
            this.setState((prevState) => ({
                currentPage: prevState.currentPage + 1,
            }));
        }
    }

    handlePrevPage() {
        const { currentPage } = this.state;

        if (currentPage > 1) {
            this.setState((prevState) => ({
                currentPage: prevState.currentPage - 1,
            }));
        }
    }

    filterBrands = () => {
        const filterBrands = [...new Set(this.props.products.map(item => item.brand))];
        return filterBrands;
    }

    filterModels = () => {
        const filterModel = [...new Set(this.props.products.map(item => item.model))];
        return filterModel;
    }

    handleSearchChange = (event) => {
        this.setState({ searchBrand: event.target.value });
    };
    handleSearchModels = (event) => {
        this.setState({ searchModel: event.target.value });
    };


    handleBrandCheckboxChange = (brand) => {
        const { selectedBrands } = this.state;

        if (selectedBrands.includes(brand)) {
            this.setState({
                selectedBrands: selectedBrands.filter((item) => item !== brand),
            });
        } else {
            this.setState({ selectedBrands: [...selectedBrands, brand] });
        }
    };


    filterProductsByBrandAndModel = () => {
        const { selectedBrands, selectedModels } = this.state;
        const { products } = this.props;

        return products.filter((product) =>
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            (selectedModels.length === 0 || selectedModels.includes(product.model))
        );
    };

    handleModelCheckboxChange = (model) => {
        const { selectedModels } = this.state;
        if (selectedModels.includes(model)) {
            this.setState({
                selectedModels: selectedModels.filter((item) => item !== model),
            });
        } else {
            this.setState({ selectedModels: [...selectedModels, model] });
        }
    };

// ...




    handleSortChange = (sortOption) => {
        this.setState({
            sortOption,
        });
    };
    handlePriceSortChange = (priceSort) => {
        this.setState({
            priceSort,
        });
    };

    handleIncrement = (productId) => {
        const selectedProduct = this.props.selectedProduct.find(item => item.id === productId);
        if (selectedProduct) {
            this.props.handleIncrement(selectedProduct);
        }
    };

    handleDecrement = (productId) => {
        const selectedProduct = this.props.selectedProduct.find(item => item.id === productId);
        if (selectedProduct) {
            this.props.handleDecrement(selectedProduct);
        }
    };

    headerSearchChange = (event) => {
        const searchBrand = event.target.value;
        this.setState({ searchBrand });
    };



    render() {

        let{products,selectedProduct,searchTerm}=this.props

        const { currentPage, productsPerPage, searchBrand,searchModel, selectedBrands,selectedModels,sortOption, priceSort } = this.state;
        if (!selectedProduct) {
            selectedProduct = []; // Varsayılan değer, boş bir dizi olarak belirlenebilir.
        }
        let  brands=this.filterBrands()
        let models=this.filterModels()
        const filteredBrands = brands.filter((brand) =>
            brand.toLowerCase().includes(searchBrand.toLowerCase())
        );
        const filteredModels = models.filter((brand) =>
            brand.toLowerCase().includes(searchModel.toLowerCase())
        );

        let sortedProducts = [...products];


        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        if (searchTerm.length > 0) {
            sortedProducts = sortedProducts.filter((product) =>
                (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
                (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand.toLowerCase() === searchTerm.toLowerCase())
            );
        }
        if(searchBrand.length>0){

        }
       // const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);


        const filteredProducts = this.filterProductsByBrandAndModel(); // Tüm ürün listesini filtrele
        const searchedProducts = filteredProducts.filter((product) =>
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase() === searchTerm.toLowerCase())
        );
        if (sortOption === 'oldToNew') {
            searchedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortOption === 'newToOld') {
            searchedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        if (priceSort === 'lowToHigh') {
            searchedProducts.sort((a, b) => a.price - b.price);
        } else if (priceSort === 'highToLow') {
            searchedProducts.sort((a, b) => b.price - a.price);
        }
        const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Sayfadaki ürünleri seç
        const totalPages = Math.ceil(searchedProducts.length / productsPerPage);


        return (
            <div className={"product-list-root"}>
                <div className="product-list-wrapper">
                    <div className="menu-icon" onClick={this.openMenu}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div className={`left-container ${this.state.isOpenMenu === true ? "seen" : ""}`}>
                        <div className="close-item" onClick={this.closeMenu}>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                                    fill="#0F0F0F"/>
                            </svg>
                        </div>
                        <div className={`left-block `}>
                            <span className="title">sort by</span>
                            <div className="sort-by-block">

                                <div className="sort-block">
                                    <div className="sort-item">
                                        <input
                                            type="checkbox"
                                            value="oldToNew"
                                            checked={this.state.sortOption === 'oldToNew'}
                                            onChange={() => this.handleSortChange('oldToNew')}
                                        />
                                        Old To new
                                    </div>
                                    <div className="sort-item">
                                        <input
                                            type="checkbox"
                                            value="newToOld"
                                            checked={this.state.sortOption === 'newToOld'}
                                            onChange={() => this.handleSortChange('newToOld')}
                                        />
                                        New to old
                                    </div>
                                    <div className="sort-item">
                                        <input
                                            type="checkbox"
                                            value="highToLow"
                                            checked={this.state.priceSort === 'highToLow'}
                                            onChange={() => this.handlePriceSortChange('highToLow')}
                                        />
                                        Price hight to low
                                    </div>
                                    <div className="sort-item">
                                        <input
                                            type="checkbox"
                                            value="lowToHigh"
                                            checked={this.state.priceSort === 'lowToHigh'}
                                            onChange={() => this.handlePriceSortChange('lowToHigh')}
                                        />
                                        Price low to High
                                    </div>
                                </div>


                            </div>
                            <span className={"title"}>brands</span>
                            <div className="sort-by-block sort">
                                <div className="search-item">
                                    <input
                                        type="text"
                                        value={searchBrand}
                                        onChange={this.handleSearchChange}
                                        placeholder="Search..."
                                    />
                                </div>
                                <div className="sort-block">
                                    {filteredBrands.map((brand, index) => (
                                        <div key={index} className="sort-item">
                                            <input
                                                type="checkbox"
                                                onChange={() => this.handleBrandCheckboxChange(brand)}
                                                checked={this.state.selectedBrands.includes(brand)}
                                            />
                                            {brand}
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <span className={"title"}>model</span>
                            <div className="sort-by-block sort">
                                <div className="search-item">
                                    <input
                                        type="text"
                                        value={searchModel}
                                        onChange={this.handleSearchModels}
                                        placeholder="Search..."
                                    />
                                </div>
                                <div className="sort-block">
                                    {filteredModels.map((model, index) => (
                                        <div key={index} className="sort-item">
                                            <input
                                                type="checkbox"
                                                value={model}
                                                checked={this.state.selectedModels.includes(model)}
                                                onChange={() => this.handleModelCheckboxChange(model)}
                                            />
                                            {model}
                                        </div>
                                    ))}
                                </div>


                            </div>

                        </div>

                    </div>
                    <div className="product-list-container">
                        <div className="product-list">
                            {
                                currentProducts.map((item, key) => (
                                    <div className={"products"}>
                                        <div key={key} className="product-list-block">
                                            <div className="product-list-item">
                                                <Link to={"/detail/" + item.id}>
                                                    <div className="img-item">
                                                        <picture>
                                                            <img src={item.image} alt=""/>
                                                        </picture>
                                                    </div>
                                                    <span className="price">{item.price + "₺"}</span>
                                                    <div className="model">{item.name}</div>
                                                </Link>
                                                <div className="btn-item"
                                                     onClick={(event) => this.props.handleAddToCart(item)}>
                                                    Add to Cart
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }

                        </div>
                        {
                            totalPages > 1 &&
                            <div className="pagination-item">
                                <div
                                    onClick={this.handlePrevPage}
                                    className={`pagination-link ${currentPage === 1 ? 'disabled' : ''}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M11.0821 2.8079C11.3246 3.08499 11.2965 3.50617 11.0194 3.74862L6.25946 7.91357L11.0194 12.0785C11.2965 12.321 11.3246 12.7422 11.0821 13.0192C10.8397 13.2963 10.4185 13.3244 10.1414 13.082L5.09475 8.66615C4.63943 8.26774 4.63943 7.55941 5.09475 7.161L10.1414 2.74519C10.4185 2.50273 10.8397 2.53081 11.0821 2.8079Z"
                                              fill="black"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M11.0821 2.8079C11.3246 3.08499 11.2965 3.50617 11.0194 3.74862L6.25946 7.91357L11.0194 12.0785C11.2965 12.321 11.3246 12.7422 11.0821 13.0192C10.8397 13.2963 10.4185 13.3244 10.1414 13.082L5.09475 8.66615C4.63943 8.26774 4.63943 7.55941 5.09475 7.161L10.1414 2.74519C10.4185 2.50273 10.8397 2.53081 11.0821 2.8079Z"
                                              fill="#2A59FE" fill-opacity="0.3"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M11.0821 2.8079C11.3246 3.08499 11.2965 3.50617 11.0194 3.74862L6.25946 7.91357L11.0194 12.0785C11.2965 12.321 11.3246 12.7422 11.0821 13.0192C10.8397 13.2963 10.4185 13.3244 10.1414 13.082L5.09475 8.66615C4.63943 8.26774 4.63943 7.55941 5.09475 7.161L10.1414 2.74519C10.4185 2.50273 10.8397 2.53081 11.0821 2.8079Z"
                                              fill="white" fill-opacity="0.5"/>
                                    </svg>
                                </div>
                                {Array.from({length: totalPages}).map((_, index) => (
                                    <span
                                        key={index}
                                        onClick={() => this.handlePageChange(index + 1)}
                                        className={`${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                            {index + 1}
                        </span>
                                ))}
                                <div
                                    onClick={this.handleNextPage}
                                    className={`pagination-link ${currentPage === totalPages ? 'disabled' : ''}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M4.91822 13.0192C4.67576 12.7421 4.70384 12.321 4.98093 12.0785L9.74087 7.91356L4.98093 3.74861C4.70384 3.50616 4.67576 3.08498 4.91822 2.80789C5.16067 2.5308 5.58185 2.50272 5.85894 2.74518L10.9056 7.16098C11.3609 7.55939 11.3609 8.26772 10.9056 8.66614L5.85894 13.0819C5.58185 13.3244 5.16067 13.2963 4.91822 13.0192Z"
                                              fill="black"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M4.91822 13.0192C4.67576 12.7421 4.70384 12.321 4.98093 12.0785L9.74087 7.91356L4.98093 3.74861C4.70384 3.50616 4.67576 3.08498 4.91822 2.80789C5.16067 2.5308 5.58185 2.50272 5.85894 2.74518L10.9056 7.16098C11.3609 7.55939 11.3609 8.26772 10.9056 8.66614L5.85894 13.0819C5.58185 13.3244 5.16067 13.2963 4.91822 13.0192Z"
                                              fill="#2A59FE" fill-opacity="0.3"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M4.91822 13.0192C4.67576 12.7421 4.70384 12.321 4.98093 12.0785L9.74087 7.91356L4.98093 3.74861C4.70384 3.50616 4.67576 3.08498 4.91822 2.80789C5.16067 2.5308 5.58185 2.50272 5.85894 2.74518L10.9056 7.16098C11.3609 7.55939 11.3609 8.26772 10.9056 8.66614L5.85894 13.0819C5.58185 13.3244 5.16067 13.2963 4.91822 13.0192Z"
                                              fill="white" fill-opacity="0.5"/>
                                    </svg>
                                </div>
                            </div>

                        }

                    </div>
                    <div className="right-container">
                        <span>Card</span>
                        <div className="cart-container">

                            {
                                selectedProduct && selectedProduct.map((selectedProduct, index) =>

                                    selectedProduct.quantity > 0 &&
                                    <div key={index} className="cart-block">
                                        <div className="info-item">
                                            <div className="model">{selectedProduct.name}</div>
                                            <div className="price">{selectedProduct.price + "₺"}</div>
                                        </div>
                                        <div className="total-item">
                                            <div className="minus" onClick={() => this.props.removeToCart(selectedProduct)}>
                                                <svg width="5" height="2" viewBox="0 0 5 2" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.527805 0.184H4.4898V1.934H0.527805V0.184Z" fill="black"/>
                                                    <path d="M0.527805 0.184H4.4898V1.934H0.527805V0.184Z" fill="#2A59FE"
                                                          fill-opacity="0.3"/>
                                                    <path d="M0.527805 0.184H4.4898V1.934H0.527805V0.184Z" fill="white"
                                                          fill-opacity="0.35"/>
                                                </svg>

                                            </div>
                                            {selectedProduct.quantity && (
                                                <span>{selectedProduct.quantity}</span>
                                            )}
                                            <div className="plus"
                                                 onClick={() => this.props.handleAddToCart(selectedProduct)}>
                                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.31894 4.876H5.53494V7.596H3.47094V4.876H0.702938V2.924H3.47094V0.204H5.53494V2.924H8.31894V4.876Z"
                                                        fill="black"/>
                                                    <path
                                                        d="M8.31894 4.876H5.53494V7.596H3.47094V4.876H0.702938V2.924H3.47094V0.204H5.53494V2.924H8.31894V4.876Z"
                                                        fill="#2A59FE" fill-opacity="0.3"/>
                                                    <path
                                                        d="M8.31894 4.876H5.53494V7.596H3.47094V4.876H0.702938V2.924H3.47094V0.204H5.53494V2.924H8.31894V4.876Z"
                                                        fill="white" fill-opacity="0.35"/>
                                                </svg>
                                            </div>


                                        </div>

                                    </div>
                                )

                            }


                        </div>

                        <div className="checkout-block">
                            <div className={"price"}>Total Price: <span>{this.props.totalPrice + "₺"}</span></div>

                            <div className="btn-item">
                                Checkout
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default ProductListContainer;