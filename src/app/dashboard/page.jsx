"use client";
// app/dashboard/page.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyAppeals = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Fetching appeals for user:", user);

        if (!user) {
          console.log("❌ No user found, redirecting to login...");
          router.push('/login');
          return;
        }

        const res = await fetch('http://localhost:5000/api/appeals');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        console.log("📦 Raw appeals data:", data);

        // Get current user info
        const myId = user.id || user._id;
        const myEmail = user.email?.toLowerCase();
        
        // Better filtering logic
        const filtered = (data.appeals || data).filter((appeal) => {
          // Check all possible user identification fields in appeal
          const appealUserId = appeal.userId || appeal.user?._id || appeal.user?.id;
          const appealUserEmail = (appeal.userEmail || appeal.email || appeal.user?.email)?.toLowerCase();
          const appealCreator = appeal.creator || appeal.owner;

          console.log(`Checking appeal ${appeal._id}:`, {
            appealUserId,
            appealUserEmail,
            appealCreator,
            myId,
            myEmail
          });

          // Check if any of the user identification fields match
          const matches = 
            (myId && (appealUserId === myId || appealCreator === myId)) ||
            (myEmail && appealUserEmail === myEmail);

          console.log(`✅ Appeal ${appeal._id} matches:`, matches);
          return matches;
        });

        console.log("✅ Filtered appeals:", filtered);
        setAppeals(filtered);
      } catch (err) {
        console.error('❌ Failed to fetch appeals', err);
        setError(err.message || 'Failed to load appeals');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyAppeals();
    } else {
      setLoading(false);
    }
  }, [user, router]);

  // Alternative: Backend এ directly user-specific API call করুন
  const fetchUserAppealsFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        router.push('/login');
        return;
      }

      // Backend এ user-specific endpoint থাকলে সরাসরি সেটা use করুন
      const userId = user.id || user._id;
      const userEmail = user.email;

      // APPROACH 1: User ID দিয়ে fetch
      const res = await fetch(`http://localhost:5000/api/appeals/user/${userId}`);
      
      // APPROACH 2: User Email দিয়ে fetch (যদি backend support করে)
      // const res = await fetch(`http://localhost:5000/api/appeals/user/email/${encodeURIComponent(userEmail)}`);
      
      // APPROACH 3: Query parameter দিয়ে
      // const res = await fetch(`http://localhost:5000/api/appeals?userId=${userId}`);

      if (!res.ok) {
        // যদি user-specific endpoint না থাকে, fallback to all appeals with filtering
        console.log("User-specific endpoint not available, falling back to filtering...");
        const fallbackRes = await fetch('http://localhost:5000/api/appeals');
        if (!fallbackRes.ok) throw new Error(`HTTP ${fallbackRes.status}`);
        
        const data = await fallbackRes.json();
        const myEmail = user.email?.toLowerCase();
        const myId = user.id || user._id;
        
        const filtered = (data.appeals || data).filter(appeal => {
          const appealUserEmail = (appeal.userEmail || appeal.email || appeal.user?.email)?.toLowerCase();
          const appealUserId = appeal.userId || appeal.user?._id || appeal.user?.id;
          
          return appealUserId === myId || appealUserEmail === myEmail;
        });
        
        setAppeals(filtered);
        return;
      }

      const data = await res.json();
      setAppeals(data.appeals || []);
      
    } catch (err) {
      console.error('Failed to fetch user appeals', err);
      setError(err.message || 'Failed to load your appeals');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appeal? This action cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appeals/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setAppeals((prev) => prev.filter((a) => (a._id || a.id) !== id));
      alert('Appeal deleted successfully!');
    } catch (err) {
      alert('Failed to delete appeal.');
      console.error(err);
    }
  };

  const handleCreateAppeal = () => {
    router.push('/add-appeal');
  };

  // Debug information
  console.log("Current user:", user);
  console.log("Filtered appeals count:", appeals.length);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.name || user.email}!</p>
            {/* Debug info */}
            <div className="text-xs text-gray-500 mt-1">
              User ID: {user.id || user._id} | Email: {user.email}
            </div>
          </div>
          <button
            onClick={handleCreateAppeal}
            className="px-6 py-3 bg-[#af002b] text-white rounded-lg hover:bg-[#900023] transition-colors"
          >
            Create New Appeal
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Appeals</h3>
            <p className="text-3xl font-bold text-[#af002b]">{appeals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Appeals</h3>
            <p className="text-3xl font-bold text-green-600">
              {appeals.filter(a => a.status === 'active' || !a.status).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-blue-600">
              {appeals.filter(a => a.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Appeals Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Appeals</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {appeals.length} appeal(s) that you created
            </p>
          </div>

          <div className="p-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#af002b] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your appeals...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700">Error: {error}</p>
                </div>
              </div>
            )}

            {!loading && appeals.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appeals found</h3>
                <p className="text-gray-600 mb-4">You haven't created any appeals yet.</p>
                <button
                  onClick={handleCreateAppeal}
                  className="px-6 py-2 bg-[#af002b] text-white rounded-lg hover:bg-[#900023] transition-colors"
                >
                  Create Your First Appeal
                </button>
              </div>
            )}

            {!loading && appeals.length > 0 && (
              <div className="grid gap-4">
                {appeals.map((appeal) => (
                  <div key={appeal._id || appeal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {appeal.appealTitle || appeal.title || 'Untitled Appeal'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {appeal.location || 'Location not specified'}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Target: ${appeal.targetAmount?.toLocaleString() || '0'}
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              (appeal.status || 'active').toLowerCase() === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {appeal.status || 'Active'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4 md:mt-0">
                        <button
                          onClick={() => router.push(`/appeals/${appeal._id || appeal.id}`)}
                          className="px-4 py-2 bg-[#af002b] text-white rounded-md hover:bg-[#900023] transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(appeal._id || appeal.id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;