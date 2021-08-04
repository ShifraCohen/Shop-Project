import produce from 'immer'
import createReducer from "./ReducerUtils";



const initialState = {
    categories: [],
}
const categoryFunctions = {

    setCategories(state, action) {
        state.categories = action.payload;
    },
    
};
export default produce((state, action) => createReducer(state, action, categoryFunctions), initialState);