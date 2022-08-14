import { useAppSelector } from '../config/hooks';
import { selectAuth } from '../store/authSlice';

export default function useAuth() {
  return useAppSelector(selectAuth);
}
