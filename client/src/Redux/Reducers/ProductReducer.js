import produce from 'immer'
import createReducer from "./ReducerUtils";



const initialState = {
    products: [],
    productsFilteredByCategory:[],
}
const productFunctions = {

    setProducts(state, action) {
        state.products = action.payload;
    },
    setProductsFilteredByCategory(state, action) {
        state.productsFilteredByCategory = action.payload;
    },
    increaseProductQuentity(state, action) {
        state.products.forEach(p => {
            if (p._id === action.payload)
                p.quentity++;
        });
    },
    decreaseProductQuentity(state, action) {
        state.products.forEach(p => {
            if (p._id === action.payload)
                p.quentity--;
        });
    },



};
export default produce((state, action) => createReducer(state, action, productFunctions), initialState);