import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({ children, open, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close(); // this clean up function calls whenever this effect function about to execute 
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
            {children}
        </dialog>,
        document.getElementById('modal'));
}