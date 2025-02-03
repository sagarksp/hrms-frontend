import {combineReducers} from "@reduxjs/toolkit";
import regFormReducer from "../slices/regFormSlice"

const rootReducer  = combineReducers({
    regForm:regFormReducer,
  
})

export default rootReducer;