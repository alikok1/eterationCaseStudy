// import * as actionTypes from "../constants/actionTypes";
import * as ROUTES from '../constants/routePaths';
import {
    getSliderItemsDataInit
} from './homePageService';



export default class PageService {
    currentPage = ROUTES.HOME_PAGE;

    constructor(url){
        this.currentPage = url;
    }

    getData = (dispatch) =>{
        return new Promise((resolve,reject)=>{
            //TODO : layout data çekildiyse tekrar çekilmeyecek!
                    switch (this.currentPage) {
                        case ROUTES.HOME_PAGE:
                            getSliderItemsDataInit(dispatch)
                                .then((res)=>{
                                    resolve(res);
                                });
                            break;
                        case ROUTES.PRODUCT_DETAIL_PAGE:
                            getSliderItemsDataInit(dispatch)
                                .then((res)=>{
                                    resolve(res);
                                });
                    }


        });
    }
}


