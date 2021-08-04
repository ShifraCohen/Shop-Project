import authHeader from './authHeader'
import { actions } from "../actions";
const URL_API = "http://localhost:5000/";
export const logoutUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'LOGOUT_USER') {

        dispatch(actions.logout());
        dispatch(actions.setMessage('You\'r logged out!')) // Hardcoded error here

        localStorage.removeItem("user");
        localStorage.removeItem("token");


    }
    return next(action);

}

export const loginUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'LOGIN_USER') {
        // dispatch(actions.clearMessage())

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify(action.payload);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch(URL_API + "loginUser", requestOptions)
            .then(async response => {
                const result = await response.json();
                dispatch(actions.clearMessage())

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.message) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.loginSuccess(result));
                    // dispatch(actions.setMessage('You\'r logged in!'))
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("token", JSON.stringify(result.token));
                }
            })
            .catch(error => {
                if (JSON.parse(error).includes("fetch")) {
                    dispatch(actions.setMessage("Failed to fetch, please try again"))
                }
                console.log('error', error)
                dispatch(actions.loginFail());
            });
    }
    return next(action);

}

export const registerUser = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'REGISTER_USER') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify(action.payload);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch(URL_API + "registerUser", requestOptions)
            .then(async response => {
                const result = await response.json();
                dispatch(actions.clearMessage())

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.registerSuccess(result));
                    dispatch(actions.setMessage('You\'r almost member now! Please check your email and complete the registeration'))
                }
            })
            .catch(error => {
                if (JSON.parse(error).includes("fetch")) {

                    dispatch(actions.setMessage("Failed to fetch, please try again"))
                }
                console.log(JSON.stringify(error));
                console.log(error);
                console.log(error.toString());
                console.log('error', error)
                dispatch(actions.registerFail());
            });
    }
    return next(action);
}

export const getAllProducts = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'GET_ALL_PRODUCTS') {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(URL_API + "getAllProducts", requestOptions)
            .then(async response => {
                dispatch(actions.clearMessage())

                const result = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.setProducts(result.products))
                }
            })
            .catch(error => {
                dispatch(actions.setMessage("Oops... there is some problem,\n please try loading the page again"))
                console.log('error', error)
            });
    }
    return next(action)
}

export const getProductsByCategoryId = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'GET_PRODUCTS_BY_CATEGORY_ID') {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(`${URL_API}getProductsByCategoryId/${action.payload}`, requestOptions)
            .then(async response => {
                dispatch(actions.clearMessage())

                const result = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.setProductsFilteredByCategory(result.products))
                }
            })
            .catch(error => {
                dispatch(actions.setMessage("Oops... there is some problem,\n please try loading the page again"))
                console.log('error', error)
            });
    }
    return next(action)
}

export const addProduct = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'ADD_PRODUCT') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json", "Authorization", JSON.parse(localStorage.getItem('token')));
        var body = JSON.stringify(action.payload);
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('token'))
            },
            // headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch(URL_API + "createProduct", requestOptions)
            .then(async response => {
                const result = await response.json();
                dispatch(actions.clearMessage())

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.setMessage('Added!'))
                }
            })
            .catch(error => {
                if (JSON.parse(error).includes("fetch")) {

                    dispatch(actions.setMessage("Failed to fetch, please try again"))
                }
                console.log(JSON.stringify(error));
                console.log(error);
                console.log(error.toString());
                console.log('error', error)
            });
    }
    return next(action);
}
export const addNewAddress = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'ADD_NEW_ADDRESS') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let addressAndUser={address:action.payload,userId:getState().userReducer.user._id}
        var body = JSON.stringify(addressAndUser);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch(URL_API + "addNewAddress", requestOptions)
            .then(async response => {
                const result = await response.json();
                dispatch(actions.clearMessage())

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.setUserAddress(result))
                    dispatch(actions.setMessage('Added!'))
                }
            })
            .catch(error => {
                if (JSON.parse(error).includes("fetch")) {

                    dispatch(actions.setMessage("Failed to fetch, please try again"))
                }
                console.log(JSON.stringify(error));
                console.log(error);
                console.log(error.toString());
                console.log('error', error)
            });
    }
    return next(action);
}

export const getAllCategories = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'GET_ALL_CATEGORIES') {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(URL_API + "getAllCategories", requestOptions)
            .then(async response => {
                dispatch(actions.clearMessage())

                const result = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.setCategories(result.categories))
                }
            })
            .catch(error => {
                // dispatch(actions.setMessage("Oops... there is some problem,\n please try loading the page again"))
                console.log('error', error)
            });
    }
    return next(action)
}

export const addCategory = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'ADD_CATEGORY') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify(action.payload);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        return fetch(URL_API + "createCategory", requestOptions)
            .then(async response => {
                const result = await response.json();
                dispatch(actions.clearMessage())

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.error) || response.status;
                    dispatch(actions.setMessage(result.error))
                    return Promise.reject(error);
                } else {
                    dispatch(actions.setMessage('Added!'))
                }
            })
            .catch(error => {
                if (JSON.parse(error).includes("fetch")) {

                    dispatch(actions.setMessage("Failed to fetch, please try again"))
                }
                console.log(JSON.stringify(error));
                console.log(error);
                console.log(error.toString());
                console.log('error', error)
            });
    }
    return next(action);
}

// export const addProductToCart = ({ dispatch, getState }) => next => action => {
//     debugger;
//     if (action.type === 'ADD_PRODUCT_TO_CART') {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         var body = JSON.stringify(action.payload);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: body,
//             redirect: 'follow'
//         };

//         fetch(URL_API + "addProductToCart", requestOptions)
//             .then(async response => {
//                 const result = await response.json();
//                 // check for error response
//                 if (!response.ok) {
//                     // get error message from body or default to response status
//                     const error = (result && result.error) || response.status;
//                     dispatch(actions.setMessage(result.error))
//                     return Promise.reject(error);
//                 } else {
//                     // dispatch(actions.registerSuccess(result));
//                     dispatch(actions.setMessage('Added!'))
//                 }
//             })
//             .catch(error => {
//                 // if (error.include("Failed to fetch")) {
//                 //     dispatch(actions.setMessage("Failed to fetch"))
//                 // }
//                 console.log('error', error)
//             });
//     }
//     return next(action);
// }


// export const uploadImg = ({ dispatch, getState }) => next => action => {
//     debugger;
//     if (action.type === 'UPLOAD_IMG') {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         var body = JSON.stringify(action.payload);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: body,
//             redirect: 'follow'
//         };

//         fetch(URL_API + "uploadImg", requestOptions)
//         .then(response => response.json())
//         .then(result => {
//             dispatch(actions.setMessage(result.message))
//         })
//         .catch((error) => console.log("error", error));
//     }
//     return next(action);
// }


// export const getAllImages = ({ dispatch, getState }) => next => action => {
//     debugger;
//     if (action.type === 'GET_ALL_IMAGES') {

//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch(URL_API + "getAllImages", requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 dispatch(actions.setImages(result.images))
//             })
//             .catch(error => console.log('error', error));
//     }
//     return next(action)
// }

// // export const getUserByEmail = ({ dispatch, getState }) => next => action => {
// //     debugger;
// //     if (action.type === 'GET_USER_BY_EMAIL') {
// //         alert("hi!");


// //         var requestOptions = {
// //             method: 'GET',
// //             redirect: 'follow'
// //         };

// //         fetch(`localhost:4200/getUserByEmail/${action.paylaod}`, requestOptions)
// //             .then(response => response.json())
// //             .then(result => {
// //                 dispatch(actions.setCurrentUser(result))
// //             })
// //             .catch(error => console.log('error', error));


// //     }
// //     return next(action)
// // }

// export const sendMail = ({ dispatch, getState }) => (next) => (action) => {
//     if (action.type == "SEND_MAIL") {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         var body = JSON.stringify(action.payload);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: body,
//             redirect: 'follow'
//         };
//         fetch(`${URL_API}sendMail`, requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 dispatch(actions.setMessage(result.message))
//             })
//             .catch((error) => console.log("error", error));
//     }
//     return next(action);
// };