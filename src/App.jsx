import React, { useState } from 'react';
import EmailForm from './components/EmailForm';
import EmailList from './components/EmailList';
import { FiMail, FiList, FiSettings } from 'react-icons/fi';

function App() {
  const [activeTab, setActiveTab] = useState('compose');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FiMail className="text-2xl text-purple-600 mr-3" />
              <span className="text-xl font-bold text-gray-800">Email Dashboard</span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('compose')}
                className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'compose' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiMail className="mr-2" />
                Compose
              </button>
              {/* <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'history' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiList className="mr-2" />
                History
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'compose' ? <EmailForm /> : <EmailList />}
      </main>

      {/* <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Email Dashboard Frontend | Backend hosted on GoDaddy</p>
            <p className="mt-1">Make sure your GoDaddy backend is properly configured</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default App;