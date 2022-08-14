import { Link } from 'react-router-dom';
import { useAppDispatch } from '../config/hooks';
import { signout, User } from '../store/authSlice';

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
  user: User;
};

export default function AuthenticatedLayout({
  children,
  user,
}: AuthenticatedLayoutProps) {
  const dispatch = useAppDispatch();

  const handleSignout = async () => {
    dispatch(signout());
  };

  return (
    <div>
      <header className="container">
        <nav className="py-3 d-flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
        </nav>

        <div>
          <div>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSignout}
          >
            Signout
          </button>
        </div>
      </header>

      <div className="container py-3">{children}</div>
    </div>
  );
}
