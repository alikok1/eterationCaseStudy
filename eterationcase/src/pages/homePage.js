import React, {Component} from 'react';
import {getSliderItems} from "../services/webService";
import HeaderComponent from "../components/pageComponent/headerComponent";
import ProductListContainer from "../containers/productListContainer";


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
           isOpenModal:false,
            products: [],
            totalPrice: 0,
            cartItems: [],
            selectedProducts:[],
            searchTerm: '',
        };
    }



    componentDidMount() {
        this.getSliderItems();
        this.restoreCartState();
    }

    getSliderItems = async () => {
        try {
            const response = await getSliderItems();
            const products = response.data;
            this.setState({ products });
        } catch (error) {
            console.error('error', error);
        }
    };
    componentDidUpdate() {
        this.saveCartState();
    }

    saveCartState = () => {
        localStorage.setItem('cartState', JSON.stringify(this.state));
    };

    restoreCartState = () => {
        const savedCartState = localStorage.getItem('cartState');
        if (savedCartState) {
            const parsedCartState = JSON.parse(savedCartState);
            this.setState(parsedCartState);
        }
    };

    handleAddToCart = (product,event) => {
        const productPrice = parseFloat(product.price);
        const existingItem = this.state.cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedCart = this.state.cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );

            this.setState((prevState) => ({
                cartItems: updatedCart,
                totalPrice: prevState.totalPrice + productPrice,
                selectedProducts: [...prevState.selectedProducts, { ...product, quantity: existingItem.quantity + 1 }],
            }));
        } else {
            this.setState((prevState) => ({
                cartItems: [...prevState.cartItems, { ...product, quantity: 1 }],
                totalPrice: prevState.totalPrice + productPrice,
                selectedProducts: [...prevState.selectedProducts, { ...product, quantity: 1 }],
            }));
        }

    };
    removeToCart = (product) => {
        const productPrice = parseFloat(product.price);
        const existingItem = this.state.cartItems.find((item) => item.id === product.id);

        if (existingItem && existingItem.quantity > 0) {
            const updatedCart = this.state.cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );

            this.setState((prevState) => ({
                cartItems: updatedCart,
                totalPrice: prevState.totalPrice - productPrice,
                selectedProducts: [
                    ...prevState.selectedProducts,
                    { ...product, quantity: existingItem.quantity - 1 },
                ],
            }));
        } else if (!existingItem) {
            this.setState((prevState) => ({
                cartItems: [...prevState.cartItems, { ...product, quantity: 1 }],
                totalPrice: prevState.totalPrice + productPrice,
                selectedProducts: [...prevState.selectedProducts, { ...product, quantity: 1 }],
            }));
        }
    };

    handleIncrement = (productId) => {
        const updatedCart = this.state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );

        this.setState((prevState) => ({
            cartItems: updatedCart,
            totalPrice: prevState.totalPrice + this.getProductById(productId).price,
        }));
    };

    handleDecrement = (productId) => {
        const updatedCart = this.state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        );

        this.setState((prevState) => ({
            cartItems: updatedCart,
            totalPrice: Math.max(prevState.totalPrice - this.getProductById(productId).price, 0),
        }));
    };

    getProductById = (productId) => {
        return this.state.products.find((product) => product.id === productId);
    };

    headerSearchChange = (term) => {
        this.setState({ searchTerm: term });
    };




    render() {
       let {products}=this.state
        return (
            <div className={"homepage-root"}>
                <HeaderComponent
                    onSearchChange={this.headerSearchChange}
                    totalPrice={this.state.totalPrice}/>
                <ProductListContainer
                    searchTerm={this.state.searchTerm}
                    selectedProduct={this.state.cartItems}
                                      totalPrice={this.state.totalPrice}
                                      handleAddToCart={this.handleAddToCart}
                                      removeToCart={this.removeToCart}
                                      products={products}/>


            </div>
        );
    }
}

export default HomePage;
