import produce from 'immer'
import createReducer from "./ReducerUtils";



const initialState = {
   images: [],
}
const imageFunctions = {
   
    setImages(state, action) {
        state.images = action.payload;
    },
   
   

};
export default produce((state, action) => createReducer(state, action, imageFunctions), initialState);