import React from 'react';
import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  // criando uma propriedade dentro da rota para receber um componente no formato de variável.
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              // state -> manter histórico do navegador
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

// render -> modificar logistica que o react faz para mostrar uma tela, dentro do render faz a verificação para verificar se está autenticado.
// render -> função que verifica se a rota for privada e o usuário nõa está autenticado, vai para / (login)
// se a rota não for privada e ele está autenticado, ele vai para dashboard. | se não entrar para nenhum dos casos, vai ficar para login/

export default Route;

//   rota    |   autenticação
// 1- true          true          OK, continua no dashboard
// 2- true          false         REDIRECIONAR PRO LOGIN
// 3- false         true          REDIRECIONAR PARA O DASHBOARD
// 4- false         false         OK, continua no login
