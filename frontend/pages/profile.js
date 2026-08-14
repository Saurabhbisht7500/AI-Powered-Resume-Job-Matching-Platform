import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import { User, Mail, Phone, Briefcase, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { withAuth } from "../hoc/withAuth";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <Topbar title="Profile" subtitle="Your account details" />
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Topbar title="Profile" subtitle="Your account details" />
      
      <div className="max-w-2xl space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-2xl text-slate-900">{user.name || "User"}</p>
                <p className="text-sm text-slate-500">{user.jobTitle || "Not specified"}</p>
              </div>
            </div>
            <Link
              href="/profile-setup"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </Link>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-blue-600" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                <p className="text-slate-900 font-medium">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                  <p className="text-slate-900 font-medium">{user.phone}</p>
                </div>
              </div>
            )}

            {user.jobTitle && (
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Job Title</p>
                  <p className="text-slate-900 font-medium">{user.jobTitle}</p>
                </div>
              </div>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="border-t border-slate-200 pt-6 mt-6">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">About</p>
              <p className="text-slate-700 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Skills */}
          {user.skills && (
            <div className="border-t border-slate-200 pt-6 mt-6">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <FileText size={14} /> Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {user.skills.split(",").map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Profile Completion Status */}
          <div className="border-t border-slate-200 pt-6 mt-6">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Profile Status</p>
            <div className="flex items-center gap-2">
              {user.isProfileComplete ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="text-sm text-green-700">Profile Complete</p>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="text-sm text-yellow-700">
                    Profile Incomplete -{" "}
                    <Link href="/profile-setup" className="font-medium underline">
                      Complete it now
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Profile);
