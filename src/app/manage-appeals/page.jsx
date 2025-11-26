"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";

export default function ManageAppealsPage() {
  const { data: session, status } = useSession();
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAppeals = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is authenticated
        if (!session?.user) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        // Get user email from session
        const userEmail = session.user.email;

        if (!userEmail) {
          setError("User email not available");
          setLoading(false);
          return;
        }

        // Fetch by user email
        const res = await fetch(
          `https://safe-ummah-server.vercel.app/api/appeals/user/email/${encodeURIComponent(
            userEmail
          )}`
        );

        if (!res.ok) {
          // Fallback: fetch all and filter client-side
          const fallbackRes = await fetch(
            "https://safe-ummah-server.vercel.app/api/appeals"
          );
          if (!fallbackRes.ok)
            throw new Error(`Failed to fetch appeals: ${fallbackRes.status}`);

          const data = await fallbackRes.json();
          const allAppeals = data.appeals || [];

          // Client-side filtering by email
          const userAppeals = allAppeals.filter(
            (appeal) =>
              appeal.userEmail === userEmail ||
              (appeal.user && appeal.user.email === userEmail)
          );

          setAppeals(userAppeals);
          return;
        }

        const data = await res.json();
        setAppeals(data.appeals || []);
      } catch (err) {
        console.error("Error fetching appeals:", err);
        setError(err.message || "Failed to load your appeals");
      } finally {
        setLoading(false);
      }
    };

    // Fetch when session is available
    if (status === "authenticated") {
      fetchUserAppeals();
    } else if (status === "unauthenticated") {
      setLoading(false);
      setError("Please log in to view your appeals");
    }
  }, [session, status]);

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this appeal? This action cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(
        `https://safe-ummah-server.vercel.app/api/appeals/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      // Remove from state
      setAppeals((prev) => prev.filter((appeal) => appeal._id !== id));
    } catch (err) {
      alert("Failed to delete appeal");
      console.error(err);
    }
  };

  // Debugging info
  if (status === "authenticated" && error?.includes("not authenticated")) {
  }

  // Show loading state
  if (status === "loading" || loading) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af002b] mx-auto mb-4"></div>
              <p>Loading your appeals...</p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Manage Your Appeals</h1>
                <p className="text-gray-600 mt-1">
                  View and manage appeals you created
                </p>
                {/* Debug info */}
                {session?.user && (
                  <p className="text-sm text-green-600 mt-1">
                    Logged in as: {session.user.email}
                  </p>
                )}
              </div>
              <Link
                href="/add-appeal"
                className="px-4 py-2 bg-[#af002b] text-white rounded-md hover:bg-[#900023] transition-colors"
              >
                Create New Appeal
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
              {error.includes("not authenticated") && session?.user && (
                <p className="text-sm mt-2">
                  Session exists but authentication check failed. Please check
                  console for details.
                </p>
              )}
            </div>
          )}

          {/* Appeals Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    Target Amount
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
                {appeals.length === 0 && !loading && !error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-center">
                        <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No appeals found
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                          {session?.user
                            ? "You haven't created any appeals yet. Start by creating your first appeal to help those in need."
                            : "Please log in to view your appeals."}
                        </p>
                        {session?.user && (
                          <Link
                            href="/add-appeal"
                            className="inline-flex items-center px-4 py-2 bg-[#af002b] text-white rounded-md hover:bg-[#900023] transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Create Your First Appeal
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  appeals.map((appeal) => (
                    <tr key={appeal._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appeal.appealTitle || "Untitled Appeal"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appeal.location || "Not specified"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        ${(appeal.targetAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            appeal.status === "active"
                              ? "bg-green-100 text-green-800"
                              : appeal.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appeal.status || "active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/appeals/${appeal._id}`}
                            className="px-3 py-1 bg-[#af002b] text-white rounded text-sm hover:bg-[#900023] transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            href={`/edit-appeal/${appeal._id}`}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(appeal._id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
