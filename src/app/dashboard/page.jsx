"use client";
// app/dashboard/page.jsx
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyAppeals = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:5000/api/appeals');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Filter by possible owner fields using session info
        const myId = session?.user?.id || session?.user?.email;
        const filtered = (data.appeals || data).filter((a) => {
          return (
            a.userId === myId ||
            a.creator === myId ||
            a.email === myId ||
            a.user === myId ||
            a.userEmail === myId ||
            a.creatorEmail === myId
          );
        });

        setAppeals(filtered);
      } catch (err) {
        console.error('Failed to fetch appeals', err);
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchMyAppeals();
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appeal? This action cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appeals/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setAppeals((prev) => prev.filter((a) => a._id !== id && a.id !== id));
    } catch (err) {
      alert('Failed to delete appeal.');
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <p className="text-gray-600">Welcome to your protected dashboard!</p>
            <p className="text-gray-600 mt-2">Manage your appeals below.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading && (
              <div className="p-6 bg-white rounded-lg shadow">Loading your appeals...</div>
            )}

            {error && (
              <div className="p-6 bg-red-50 text-red-700 rounded-lg">Error: {error}</div>
            )}

            {!loading && appeals.length === 0 && (
              <div className="p-6 bg-white rounded-lg shadow">You have not created any appeals yet.</div>
            )}

            {appeals.map((a) => (
              <div key={a._id || a.id} className="p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{a.appealTitle || a.title || 'Untitled'}</div>
                  <div className="text-sm text-gray-600">{a.location || a.city || ''}</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/appeals/${a._id || a.id}`)}
                    className="px-4 py-2 bg-[#af002b] text-white rounded-md hover:bg-[#900023]"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(a._id || a.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;