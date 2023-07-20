import { useEffect } from "react";

export default function useClickOutSide( ref, fun ) {
    useEffect(() => {
        const listener = (e) => { 
            if( !ref.current || ref.current.contains(e.target)){
                return;
            }
            fun();
        };
    document.addEventListener('mousedown', listener);
    document.addEventListener('mousedown', listener);

    return () => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('mousedown', listener);   
    }
    }, [ref]);

}