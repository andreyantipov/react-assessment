import { useEffect, useState } from 'react';



type Key = string
type KeyWithModifier = [mod: string, key: string]

export function useGlobalKeyPress(key: Key | KeyWithModifier, trigger?: () => void) {
    const keyModifiers = ['SHIFT', 'ALT', 'Meta', 'Control'];
    const [keyModifier, setKeyModifierPressed] = useState<string>();
    const [isKeyPressed, setKeyPressed] = useState<boolean>();
    
    useEffect(() => {
        setKeyPressed(false);
    }, [isKeyPressed])

    useEffect(() => {

         function downModKeyHandler (event: any) {
            if(keyModifiers.includes(event.key) && !keyModifier) {
                setKeyModifierPressed(event.key)
            }
         }

        function upModKeyHandler() {
            setKeyModifierPressed(undefined);
        }

        function downHandler(event: any) {

            if (typeof key === 'string' && event.key === key) {
                setKeyPressed(true);
            }

            if(Array.isArray(key) && event.key === key[1] && keyModifier === key[0]) {
                setKeyPressed(true);
            }

         }

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keydown', downModKeyHandler);
        window.addEventListener('keyup', upModKeyHandler);

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.addEventListener('keydown', downModKeyHandler);
            window.removeEventListener('keypu', upModKeyHandler);
        }
    }, [key, keyModifier]);

    useEffect(() => {
        if(isKeyPressed && typeof trigger === 'function') {
            trigger();
        }

    }, [isKeyPressed, trigger])


    return isKeyPressed;
}