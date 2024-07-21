import { useEffect, useRef } from "react";

const UseClickOutside = ({ close }) => {
    const ref = useRef();

    useEffect(()=> {
        const handleClick = (e)=> {
        if (ref.current && !ref.current.contains(e.target)) 
            close(); 
        }

        document.addEventListener('click', handleClick, true);

        return ()=> document.removeEventListener('click', handleClick, true);
    }, [close])
    
    return {
        ref
    }
}
 
export default UseClickOutside;