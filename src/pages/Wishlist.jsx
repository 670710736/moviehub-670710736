import MovieGrid from '../components/MovieGrid';

import { useAuth } from '../auth/AuthContext';
import { useEffect, useState } from 'react';
import { getWishlist } from '../api/backend';

// หน้า "รายการที่อยากดู" ของสมาชิกที่ login อยู่
// (เส้นทาง /me/wishlist ครอบด้วย ProtectedRoute แล้ว)

function Wishlist() {

  const { member, token } = useAuth();

  // เก็บรายการหนังที่อยู่ใน Wishlist
  const [movies, setMovies] = useState([]);

  // สถานะการโหลด
  const [status, setStatus] = useState('loading');

  // เก็บ error
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!token) return;

    const loadWishlist = async () => {
      try {
        setStatus('loading');
        setError(null);

        // getWishlist(token) ได้ { items }
        const list = await getWishlist(token);

        // ส่งรายการหนังเข้า state
        setMovies(list.items);

        setStatus('success');

      } catch (err) {
        setError(err);
        setStatus('error');
      }
    };

    loadWishlist();

  }, [token]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">

      <h1 className="text-2xl font-semibold text-slate-900">
        รายการที่อยากดูของ {member?.displayName}
      </h1>

      <p className="mb-6 text-sm text-slate-500">
        กดปุ่มหัวใจในหน้าหนังเพื่อเพิ่มเรื่องเข้ามาที่นี่
      </p>

      <MovieGrid
        movies={movies}
        status={status}
        error={error}
      />

    </div>
  );
}

export default Wishlist;

