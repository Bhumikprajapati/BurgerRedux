import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'
export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}
export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchFailed=()=>{
    return{
        type:actionTypes.FETCH_FAILED,
    }
}
export const initIngredients=()=>{
    return dispatch=>{
          axios.get( 'https://burger-demo-68e41-default-rtdb.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data))
            } )
            .catch( error => {
               dispatch(fetchFailed())
            } );
    }
}