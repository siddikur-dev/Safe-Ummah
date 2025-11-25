// app/profile/page.jsx
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Your Profile
          </h1>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-[#af002b] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {session?.user?.name}
                </h2>
                <p className="text-gray-600">{session?.user?.email}</p>
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  {session?.user?.role || "user"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Personal Information
                </h3>
                <p>
                  <strong>Name:</strong> {session?.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {session?.user?.email}
                </p>
                <p>
                  <strong>Role:</strong> {session?.user?.role}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Account Settings
                </h3>
                <button className="bg-[#af002b] text-white px-4 py-2 rounded hover:bg-[#900023] transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
