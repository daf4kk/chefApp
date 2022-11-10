import { useState, useEffect } from 'react';

export function useDebounce(value:string, delay:number = 300):string{   //Этот хук создан для того что бы не отправлять запрос к серверу при каждом изменений input`a
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        
        //unmounts
        return () => clearTimeout(handler)
    }, [value, delay]);
    return debounced
}