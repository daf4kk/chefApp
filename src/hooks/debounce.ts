import { useState, useEffect } from 'react';

export function useDebounce(value:object, delay:number = 600):object{   //Этот хук создан для того что бы не отправлять запрос к серверу при каждом изменений input`a
    const [debounced, setDebounced] = useState<object>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        //unmounts
        return () => clearTimeout(handler)
    }, [value, delay]);
    return debounced
}