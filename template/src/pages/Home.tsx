import useAuth from '../auth/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Home</h2>

      <p>Esta página é protegida</p>

      <div>
        <p>
          <strong>Id:</strong> {user?.id}
        </p>

        <p>
          <strong>Username:</strong> {user?.username}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
}
