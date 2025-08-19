import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close(); // this clean up function calls whenever this effect function about to execute 
    }, [open])

    // onClose is triggered either when the Escape key is pressed or when a modal button is used to close it.
    //  If onClose is not defined, pressing Escape will close the modal,
    //  but it won’t update the context state (e.g., progress field). As a result, the modal closes,
    //  but can't reopen because the context still holds values like "cart" or "checkout" that weren't cleared.
    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal'));
}