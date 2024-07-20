import { useEffect, useRef } from "react";

const UseClickOutside = ({ close }) => {
    const refModal = useRef();

    useEffect(()=> {
        const handleClick = (e)=> {
        if (refModal.current && !refModal.current.contains(e.target)) 
            close(); 
        }

        document.addEventListener('click', handleClick, true);

        return ()=> document.removeEventListener('click', handleClick, true);
    }, [close])
    
    return {
        refModal
    }
}
 
export default UseClickOutside;