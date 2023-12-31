import async from "async";
import * as WebService from '../services/webService';
import * as actionTypes from "../constants/actionTypes";

const receiveSliderItems = (data) => ({
    type: actionTypes.SLIDER_ITEMS,
    payload: data
});

export const getSliderItemsDataInit = (dispatch,params) => {
    return new Promise((resolve,failure)=>{
        async.series([
            (cb) => {
                WebService.getSliderItems(params)
                    .then((res) => {
                        if (res.data.success) {
                            cb(null,res.data.success);
                        }
                    })
                    .catch((err) => {
                        // cb(null,false);
                    })
            }
        ],(err,result)=>{
            dispatch(receiveSliderItems(result[0]));
            resolve(result);
        });
    });


};