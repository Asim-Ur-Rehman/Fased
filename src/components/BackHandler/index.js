import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
function useBackButton(ActionName, handler) {
    useEffect(() => {
        BackHandler.addEventListener(ActionName, handler);
        return () => {
            BackHandler.removeEventListener(
                ActionName,
                handler
            );
        };
    }, [handler]);
}
export default useBackButton;