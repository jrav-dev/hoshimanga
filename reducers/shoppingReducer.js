import { TYPES } from "../actions/shoppingActions"

export const shoppingInitialState = {
  cart: [],
}

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      const { payload } = action

      return {
        ...state,
        cart: [...state.cart, payload],
      }
    }
    case TYPES.REMOVE_ONE_FROM_CART: {

    }
    case TYPES.REMOVE_ALL_FROM_CART: {

    }
    case TYPES.CLEAR_CART: {

    }
    default:
      return state
  }
} 