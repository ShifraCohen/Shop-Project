import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
    loginUser,
    registerUser,
    logoutUser,
    getAllProducts,
    getAllCategories,
    addCategory,
    addProduct,
    addNewAddress,
    // addProductToCart
} from '../Middlewares/crud'
// getAllImages, uploadImg,sendMail
import userReducer from "../Reducers/UserReducer"
import productReducer from "../Reducers/ProductReducer"
import categoryReducer from "../Reducers/CategoryReducer"
import shoppingCartReducer from "../Reducers/ShoppingCartReducer"
import messageReducer from "../Reducers/MessageReducer"
import imageReducer from "../Reducers/ImageReducer"

const reducer = combineReducers({
    shoppingCartReducer,
    imageReducer,
    userReducer,
    messageReducer,
    productReducer,
    categoryReducer,
})

const store = createStore(reducer,
    applyMiddleware(
        // getAllImages,
        // uploadImg,
        // sendMail,
        addNewAddress,
        addCategory,
        addProduct,
        getAllCategories,
        getAllProducts,
        registerUser,
        loginUser,
        logoutUser))

window.store = store

export default store
