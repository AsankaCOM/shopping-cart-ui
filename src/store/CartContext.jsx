import { createContext, useReducer } from "react";

const initCartItems = {items: []}

// adding context to spreading the state to other components
const CartContext = createContext({
    ...initCartItems,
    addItem: (item) => { },
    removeItem: (id) => { },
    resetCart: () => {}
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        //This isn't ideal for two reasons: (a) it mutates the state prematurely, and (b) it adds duplicate items to the cart instead of increasing their quantity
        // state.items.push(action.item)  

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items]; //take a copy

        if (existingCartItemIndex > -1) {
            const existingCardItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingCardItem,
                quantity: existingCardItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCardItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingCardItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCardItem,
                quantity: existingCardItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'RESET') {
        return { ...state, ...initCartItems };
    }

    return state; //return the unchanged state
}

// provider manages the state data
export function CartContextProvider({ children }) {
    //Since the state here is a little bit complex, I opted for useReducer().
    //  For simpler state, useState() would have been sufficient
    const [cart, dispatchCartAction] = useReducer(cartReducer, {...initCartItems })


    const addItem = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }

    const removeItem = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }

    const resetCart = () => {
        dispatchCartAction({ type: 'RESET'})
    }

    //this will distribute cart state to other components
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        resetCart
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;