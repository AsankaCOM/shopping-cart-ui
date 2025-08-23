import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout', 'order-confirmation'
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
    showOrderConfirmation: () => { },
    hideOrderConfirmation: () => { }
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart')
    }

    function hideCart() {
        setUserProgress('')
    }

    function showCheckout() {
        setUserProgress('checkout')
    }

    function hideCheckout() {
        setUserProgress('')
    }

    function showOrderConfirmation() {
        setUserProgress('order-confirmation')
    }

     function hideOrderConfirmation() {
        setUserProgress('')
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        showOrderConfirmation,
        hideOrderConfirmation
    };

    return <UserProgressContext.Provider value={userProgressCtx}>
        {children}
    </UserProgressContext.Provider>
}

export default UserProgressContext;