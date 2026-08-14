import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Topbar from '../components/Topbar';
import { withAuth } from '../hoc/withAuth';
import { User, Phone, Briefcase, FileText, AlertCircle } from 'lucide-react';

function ProfileSetup() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    jobTitle: '',
    skills: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || '',
        jobTitle: user.jobTitle || '',
        skills: user.skills || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...formData
        })
      });

      const data = await res.json();

      if (res.ok) {
        updateUser(data.user);
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          router.push('/upload');
        }, 1000);
      } else {
        setError(data.message || 'Error updating profile');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Topbar title="Complete Your Profile" subtitle="Add your details to get better job matches" />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">✓ {success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <Phone size={16} className="text-blue-600" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <Briefcase size={16} className="text-blue-600" />
                Target Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Full Stack Developer"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <FileText size={16} className="text-blue-600" />
                Skills (Comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Node.js, Python, Docker, AWS"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
              <p className="text-xs text-slate-500 mt-1">Separate skills with commas for better matching</p>
            </div>

            {/* Bio */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <User size={16} className="text-blue-600" />
                About You
              </label>
              <textarea
                placeholder="Tell us a bit about your professional background, experience, and career goals..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? 'Saving...' : 'Save & Continue'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 border border-slate-200 hover:bg-slate-50 text-slate-900 font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            Your profile information will help us match you with better job opportunities.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ProfileSetup);