import React, { createContext, useState } from 'react';
import { createPortal } from 'react-dom';

const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProps {
    children: React.ReactNode
}

export function PortalProvider({ children }: PortalProps) {
    const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | null>(null);

    return (
        <PortalContext.Provider value={portalContainerRef}>
            {children}
            <div
                id="portal-container"
                ref={el => {
                    console.log(el);
                    if(el === null || portalContainerRef !== null) 
                        return null;
                    setPortalContainerRef(el);
                }}
            />
        </PortalContext.Provider>
    )
}

export function PortalConsumer({ children }: PortalProps) {
    return (
        <PortalContext.Consumer>
            {portalContainerRef => {
                console.log(portalContainerRef);
                if(portalContainerRef === null) 
                    return null;

                return createPortal(children, portalContainerRef);
            }}
        </PortalContext.Consumer>
    )
}