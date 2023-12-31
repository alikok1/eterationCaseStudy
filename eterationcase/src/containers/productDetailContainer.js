import React, {Component} from 'react';


class ProductDetailContainer extends Component {
    render() {
        let {selectedProduct,selectedDetailProduct}=this.props
        return (
            <div className="product-detail-root">
                {
                    selectedProduct &&
                    <div className="product-detail-block">
                        <div className="img-item">
                            <img src={selectedProduct.image} alt=""/>
                        </div>
                        <div className="info-block">
                            <div className="name">{selectedProduct.name}</div>
                            <div className="price">{selectedProduct.price}</div>
                            <div className="btn-item" >Add to Cart</div>

                            <p>
                                {
                                    selectedProduct.description
                                }
                            </p>

                        </div>

                    </div>
                }

                <div className="right-container">
                    <span>Card</span>
                    <div className="cart-container">

                        {
                            selectedDetailProduct && selectedDetailProduct.map((selectedProduct, index) =>

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
                                        <div className="plus" onClick={() => this.props.handleAddToCart(selectedProduct)}>
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
        );
    }
}

ProductDetailContainer.propTypes = {};

export default ProductDetailContainer;