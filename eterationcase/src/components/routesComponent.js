import React, { Component } from "react";
import {Switch, Route, Routes,} from "react-router-dom";
import * as ROUTES from "../constants/routePaths";
import HomePage from "../pages/homePage";
import ProductDetailPage from "../pages/productDetailPage";

class RoutesComponent extends Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
                    <Route path={ROUTES.PRODUCT_DETAIL_PAGE} element={<ProductDetailPage />} />
                </Routes>
            </div>
        );
    }
}

export default RoutesComponent;