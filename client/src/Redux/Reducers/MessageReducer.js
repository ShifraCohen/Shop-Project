import produce from 'immer'
import createReducer from "./ReducerUtils";

const initialState = {
    message: '',
}


const messageFunctions = {

    setMessage(state, action) {
        if (!state.message)
            state.message = action.payload;
    },
    clearMessage(state, action) {
        state.message = '';

    },


    

};
export default produce((state, action) => createReducer(state, action, messageFunctions), initialState);

