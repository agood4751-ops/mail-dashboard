import React, { useState, useEffect } from 'react';
import { getEmails } from '../services/api';
import { FiMail, FiUser, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { format } from 'date-fns';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const loadEmails = async (pageNum = 1) => {
    setLoading(true);
    try {
      const result = await getEmails(pageNum, 10);
      setEmails(result.data);
      setTotalPages(result.pagination.pages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to load emails:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmails();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  if (loading && emails.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Sent Emails</h2>
        <button
          onClick={() => loadEmails(page)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
        >
          Refresh
        </button>
      </div>

      {emails.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FiMail className="text-4xl mx-auto mb-4 text-gray-300" />
          <p>No emails sent yet</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From / To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {emails.map((email) => (
                  <tr key={email.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-900">
                          <FiUser className="mr-2 text-gray-400" />
                          {email.from_email}
                        </div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <FiMail className="mr-2 text-gray-400" />
                          {email.to_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {email.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                        {email.body_preview}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-2" />
                        {formatDate(email.sent_at)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${email.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {email.status === 'sent' ? (
                          <FiCheckCircle className="mr-1" />
                        ) : (
                          <FiXCircle className="mr-1" />
                        )}
                        {email.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button
                        onClick={() => setSelectedEmail(email)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing page {page} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => loadEmails(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => loadEmails(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email Details</h3>
                  <p className="text-sm text-gray-500">ID: {selectedEmail.id}</p>
                </div>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">From</label>
                  <p className="mt-1">{selectedEmail.from_email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">To</label>
                  <p className="mt-1">{selectedEmail.to_email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Subject</label>
                  <p className="mt-1 font-medium">{selectedEmail.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Sent At</label>
                  <p className="mt-1">{formatDate(selectedEmail.sent_at)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1 capitalize">{selectedEmail.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Message Body</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedEmail.full_body }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailList;