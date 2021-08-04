import produce from 'immer'
import createReducer from "./ReducerUtils";
let user, token;

if (localStorage.getItem("user") !== "undefined" && localStorage.getItem("token") !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
    token = JSON.parse(localStorage.getItem("token"));
}

else {
    user = ''
    token = ''
}
const initialState = user && token
    ? { isLoggedIn: true, user}
    : { isLoggedIn: false, user: null };

const userFunctions = {
   
    registerSuccess(state, action) {
        state.user = action.payload.user;
        state.isLoggedIn = true;
    },
    loginSuccess(state, action) {
        state.user = action.payload.user;
        state.isLoggedIn = true;
    },
    loginFail(state, action) {
        state.user = null;
        state.isLoggedIn = false;
    },

    registerFail(state, action) {
        console.log("hello");
    },  
    
    logout(state, action) {
       state.isLoggedIn=false;
       state.user=null
    },  
    setUserAddress(state,action){
        state.user.addressList.push(action.payload.newAddress)
    },
};
export default produce((state, action) => createReducer(state, action, userFunctions), initialState);