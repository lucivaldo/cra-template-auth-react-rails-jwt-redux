import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../config/hooks';
import { setAuthorizationToken } from '../services/backendClient';
import { fetchToken } from '../store/authSlice';
import useAuth from './useAuth';

type State = {
  from?: Location;
};

const sessionStorageKey = '@myapp.pathname';

export default function Egide(): JSX.Element {
  const { status, token } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = (location.state as State | undefined)?.from?.pathname;

    if (status === 'idle') {
      const authorizationCode = searchParams.get('code');

      if (authorizationCode === null) {
        if (pathname) {
          sessionStorage.setItem(sessionStorageKey, pathname);
        }

        window.location.href = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/new`;
      } else {
        dispatch(fetchToken(authorizationCode));
      }
    } else if (status === 'authenticated') {
      if (token !== null) {
        setAuthorizationToken(token);
      }

      navigate(sessionStorage.getItem(sessionStorageKey) || '/');
    } else if (status === 'unauthenticated') {
      if (pathname) {
        sessionStorage.setItem(sessionStorageKey, pathname);
      }

      window.location.href = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/destroy`;
    }
  }, [dispatch, location.state, navigate, searchParams, status, token]);

  return <div>Autenticando...</div>;
}
