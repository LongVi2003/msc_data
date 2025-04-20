import React, { useEffect, useState, useRef } from 'react';
import keycloak from './keyCloak';
import { Spin } from 'antd';

export const KeycloakContext = React.createContext();

export const KeycloakProviderWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const hasInitialized = useRef(false); // tránh init nhiều lần

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      keycloak
        .init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        })
        .then((authenticated) => {
          setIsAuthenticated(authenticated);
          setInitialized(true);
        })
        .catch((error) => {
          console.error('Keycloak init error:', error);
          setInitialized(true); // tránh kẹt loading
        });
    }
  }, []);

  if (!initialized) {
    return <Spin fullscreen tip="Đang xác thực..." />;
  }

  return (
    <KeycloakContext.Provider value={keycloak}>
      {children}
    </KeycloakContext.Provider>
  );
};
