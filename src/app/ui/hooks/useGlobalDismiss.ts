import { useEffect, RefObject } from "react"

export function useGlobalDismiss(ref: RefObject<HTMLDivElement>, trigger: () => void) {
    
    useEffect(() => {

        const clickHandler = (e: Event) => {
            const selection = e.target as HTMLElement;
            const isContained = ref.current?.contains(selection);
            
            if(!isContained) {
                trigger();
            }
        }

        window.addEventListener('click', clickHandler);

        return(() => {
            window.removeEventListener('click', clickHandler);
        })

    }, [])
}