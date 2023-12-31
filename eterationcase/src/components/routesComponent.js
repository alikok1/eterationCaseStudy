import React, { Component } from "react";
import {Switch,Route,} from "react-router-dom";
import * as ROUTES from "../constants/routePaths";
import HomePage from "../pages/homePage";
import ProductDetailPage from "../pages/productDetailPage";

class RoutesComponent extends Component {

    render() {
        return (
            <div>

                <Switch>
                    <Route exact path={ROUTES.HOME_PAGE} component={HomePage}/>
                    <Route exact path={ROUTES.PRODUCT_DETAIL_PAGE} component={ProductDetailPage}/>
                </Switch>
            </div>
        );
    }
}

export default RoutesComponent;