"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ManageAppealsPage() {
  const { data: session, status } = useSession();
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        setLoading(true);
        setError(null);

        // If we have a logged-in user, request only their appeals from the backend
        const userId = session?.user?.id;
        const baseUrl = "http://localhost:5000/api/appeals";
        const url = userId ? `${baseUrl}?userId=${encodeURIComponent(userId)}` : baseUrl;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items = data.appeals || data || [];

        // If session not ready, wait; ProtectedRoute should ensure auth but we double-check
        const userEmail = session?.user?.email?.toLowerCase();

        // If we have user info, filter client-side by common owner fields
        const filtered = items.filter((a) => {
          try {
            const owners = [
              a.userId,
              a.user,
              a.creator,
              a.owner,
              a.userEmail,
              a.creatorEmail,
              a.email,
              a.user && a.user.id,
              a.user && a.user._id,
            ]
              .filter(Boolean)
              .map(String);

            if (userId && owners.includes(String(userId))) return true;
            if (userEmail) {
              return owners.some((o) => String(o).toLowerCase() === userEmail);
            }

            return false;
          } catch (e) {
            return false;
          }
        });

        // If filtered is empty but items contain an 'owner' field that equals session id, use that; otherwise show only filtered
        setAppeals(filtered);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load appeals");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch when session is ready to ensure filtering works
    if (status !== "loading") fetchAppeals();
  }, [session, status]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this appeal? This cannot be undone.")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appeals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setAppeals((prev) => prev.filter((a) => (a._id || a.id) !== id));
    } catch (err) {
      alert("Failed to delete");
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold">Manage Appeals</h1>
            <p className="text-gray-600 mt-1">
              View and manage appeals you created. Use the actions to view
              details or delete an appeal.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4">
                      Loading...
                    </td>
                  </tr>
                )}

                {error && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-red-600">
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && appeals.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8">
                      <div className="text-center">
                        <div className="mx-auto w-32 h-32 rounded-full bg-[#af002b] bg-opacity-10 flex items-center justify-center mb-4">
                          <svg
                            className="w-12 h-12 text-[#af002b]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 10h4l3 8 4-16 3 8h4"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No appeals yet
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          You haven’t created any appeals. Click below to create
                          your first one.
                        </p>
                        <div className="flex justify-center">
                          <Link
                            href="/add-appeal"
                            className="inline-block px-5 py-2 rounded-md bg-[#af002b] text-white font-medium"
                          >
                            Create Appeal
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {appeals.map((a) => (
                  <tr key={a._id || a.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {a.appealTitle || a.title || "Untitled"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {a.location || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${a.targetAmount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {a.status || "Active"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                      <Link
                        href={`/appeals/${a._id || a.id}`}
                        className="px-3 py-1 bg-[#af002b] text-white rounded-md"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(a._id || a.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
