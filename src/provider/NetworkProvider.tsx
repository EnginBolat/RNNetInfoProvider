import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

interface INetworkProvider {
    children: React.JSX.Element;
}

interface INetworkContext {
    isConnected: boolean;
}
export const NetworkContext = createContext<INetworkContext>({ isConnected: true });

export const NetworkProvider = ({ children }: INetworkProvider) => {
    const netInfo = useNetInfo();
    const [isConnected, setIsConnected] = useState(true);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (netInfo.isConnected === false) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const id = setTimeout(() => {
                Alert.alert(
                    'Bağlantı Problemi',
                    'İnternet bağlantınız yok. Lütfen kontrol edin.',
                    [{ text: 'Tamam' }]
                );
                setIsConnected(false);
            }, 3000);

            setTimeoutId(id);
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            setIsConnected(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [netInfo.isConnected]);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
        </NetworkContext.Provider>
    );
};
