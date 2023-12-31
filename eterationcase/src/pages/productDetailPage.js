import React, {Component} from 'react';
import {getSliderItems} from "../services/webService";
import HeaderComponent from "../components/pageComponent/headerComponent";
import ProductDetailContainer from "../containers/productDetailContainer";

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

            products: [],
            selectedProduct: null,
        };
    }

    componentDidMount() {
        const savedCartState = localStorage.getItem('cartState');
        const parsedCartState = JSON.parse(savedCartState);
        if (parsedCartState) {
            this.setState(parsedCartState);
        }
        this.getSliderItems();
    }


    getSliderItems = async () => {
        try {
            const response = await getSliderItems();
            const products = response.data;
            this.setState({ products });

            const { pathname } = this.props.location;
            const productId = pathname.substring(pathname.lastIndexOf('/') + 1);
            const selectedProduct = products.find(product => product.id === productId);
            if (selectedProduct) {
                this.setState({ selectedProduct });
            }
        } catch (error) {
            console.error('error', error);
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

    componentDidUpdate() {
        this.saveCartState();
    }

    saveCartState = () => {
        localStorage.setItem('cartState', JSON.stringify(this.state));
    };


    handleAddToCart = (product) => {
        this.props.handleAddToCart(product);


    };


    render() {
       let{selectedProduct}=this.state
        return (
            <div>
                <HeaderComponent totalPrice={this.state.totalPrice}/>
                <ProductDetailContainer
                    totalPrice={this.state.totalPrice}
                    selectedProduct={selectedProduct}
                    selectedDetailProduct={this.state.cartItems}
                    handleAddToCart={this.handleAddToCart}
                    removeToCart={this.removeToCart}
                handleIncrement={this.handleIncrement}
                handleDecrement={this.handleDecrement}
                />
            </div>
        );
    }
}

ProductDetailPage.propTypes = {};

export default ProductDetailPage;