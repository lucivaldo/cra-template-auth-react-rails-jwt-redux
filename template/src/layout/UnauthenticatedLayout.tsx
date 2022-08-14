import { Link } from 'react-router-dom';

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default function UnauthenticatedLayout({
  children,
}: UnauthenticatedLayoutProps) {
  return (
    <div>
      <header className="container">
        <nav className="py-3 d-flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <div className="container py-3">{children}</div>
    </div>
  );
}
