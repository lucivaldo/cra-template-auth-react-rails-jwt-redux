import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/backendClient';

export default function Posts() {
  const { data: posts = [] } = useQuery(['posts'], getPosts);

  return (
    <div>
      <h2>Posts</h2>

      <p>Esta página é protegida</p>

      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
