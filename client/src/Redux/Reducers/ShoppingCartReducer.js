import produce from 'immer'
import createReducer from "./ReducerUtils";



const initialState = {
    shoppingCart: {
        products: [],
        totalPrice: 0,
        totalItems: 0,
    }
}
const productCartFunctions = {

    addProductToCart(state, action) {
        let product = { ...action.payload };
        let isProductExist = state?.shoppingCart?.products.filter(p => p._id === product._id)
        if (isProductExist.length === 0) {
            product.amount = 1
            state.shoppingCart.products.push(product);
        }
        else {
            state.shoppingCart.products.forEach(p => {
                if (p._id === product._id)
                    p.amount++;
            });
        }
        state.shoppingCart.totalPrice += product.price
        state.shoppingCart.totalItems++;
    },
    removeProductFromCart(state, action) {
        let productId = action.payload;
        let product = state.shoppingCart.products.filter(p => p._id === productId)[0]
        state.shoppingCart.totalPrice -= product.price

        if (product.amount === 1) {
            state.shoppingCart.products = state.shoppingCart.products.filter(p => !(p._id === productId))
        }
        else {
            state.shoppingCart.products.forEach(p => {
                if (p._id === productId)
                    p.amount--;
            });
        }
        state.shoppingCart.totalItems--;

    },
    removeAllUnitsOfProductFromCart(state, action) {
        let productId = action.payload;
        let product = state.shoppingCart.products.filter(p => p._id === productId)[0]
        state.shoppingCart.totalPrice -= product.price * product.amount;
        state.shoppingCart.totalItems -= product.amount;

        state.shoppingCart.products = state.shoppingCart.products.filter(p => !(p._id === productId))
    },



};
export default produce((state, action) => createReducer(state, action, productCartFunctions), initialState);