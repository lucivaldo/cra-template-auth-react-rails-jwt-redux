import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Egide from './auth/Egide';
import useAuth from './auth/useAuth';
import AuthenticatedLayout from './layout/AuthenticatedLayout';
import UnauthenticatedLayout from './layout/UnauthenticatedLayout';

import About from './pages/About';
import Home from './pages/Home';
import Posts from './pages/Posts';

type RequireAuthProps = {
  children: JSX.Element;
};

function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (user === null) {
    return <Navigate to="/auth/egide" state={{ from: location }} replace />;
  }

  return <AuthenticatedLayout user={user}>{children}</AuthenticatedLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/egide"
          element={
            <UnauthenticatedLayout>
              <Egide />
            </UnauthenticatedLayout>
          }
        />

        <Route
          path="/about"
          element={
            <UnauthenticatedLayout>
              <About />
            </UnauthenticatedLayout>
          }
        />

        <Route
          path="/posts"
          element={
            <RequireAuth>
              <Posts />
            </RequireAuth>
          }
        />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
