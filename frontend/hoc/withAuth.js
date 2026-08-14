import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuth = (Component) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
};
