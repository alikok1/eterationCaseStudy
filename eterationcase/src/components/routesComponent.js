import React from "react";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "../constants/routePaths";
import HomePage from "../pages/homePage";
import ProductDetailPage from "../pages/productDetailPage";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
            <Route path={ROUTES.PRODUCT_DETAIL_PAGE} element={<ProductDetailPage />} />
        </Routes>
    );
}

export default RoutesComponent;
