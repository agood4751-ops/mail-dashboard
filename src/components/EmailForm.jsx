import React, { useState } from 'react';
import { sendEmail } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { FiSend, FiMail, FiUser, FiFileText } from 'react-icons/fi';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    subject: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);
  const [backendUrl, setBackendUrl] = useState('https://tradeinusdt.com/mail-dashboard/vercel-backend/api');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update API base URL if changed
      if (backendUrl) {
        // You might want to save this to localStorage or context
        localStorage.setItem('backendUrl', backendUrl);
      }
      
      const result = await sendEmail(formData);
      
      if (result.success) {
        toast.success(result.message || 'Email sent successfully!');
        // Reset form
        setFormData({
          from: '',
          to: '',
          subject: '',
          body: ''
        });
      } else {
        toast.error(result.message || 'Failed to send email');
      }
    } catch (error) {
      toast.error(error.error || 'An error occurred while sending email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Email Dashboard
          </h1>
          <p className="text-gray-600">
            Send emails 
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center mb-6">
                <FiSend className="text-2xl text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Compose Email</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="inline mr-2" />
                      From Email
                    </label>
                    <input
                      type="email"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="sender@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline mr-2" />
                      To Email
                    </label>
                    <input
                      type="email"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="recipient@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiFileText className="inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Email Subject"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Body
                  </label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    placeholder="Type your message here..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    You can use basic HTML formatting
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Configuration Panel */}
           {/* <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Backend Configuration</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backend API URL
                </label>
                <input
                  type="url"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm"
                  placeholder="https://tradeinusdt.com/mail-dashboard/vercel-backend/api"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter your GoDaddy backend API URL
                </p>
              </div>

              <button
                onClick={() => {
                  localStorage.setItem('backendUrl', backendUrl);
                  toast.success('Backend URL saved!');
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Save Configuration
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Setup</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                <li>Deploy PHP backend to GoDaddy</li>
                <li>Update database credentials</li>
                <li>Configure domain DNS records</li>
                <li>Enter backend URL above</li>
                <li>Start sending emails!</li>
              </ol>
           </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmailForm;