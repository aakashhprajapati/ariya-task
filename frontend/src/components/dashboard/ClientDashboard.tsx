'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types';
import { Button } from '@/components/ui/button';

export default function ClientDashboard() {
  const [hrUsers, setHrUsers] = useState<User[]>([]);
  const [selectedHr, setSelectedHr] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHRUsers();
  }, []);

  const fetchHRUsers = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('/api/users/hrs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHrUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch HR users:', error);
      alert('Failed to load HR users');
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (hr: User) => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(
        '/api/contacts',
        { hrId: hr.id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Message sent successfully!');
      setMessage('');
      setSelectedHr(null);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      alert(error.response?.data?.message || 'Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading HR professionals...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Available HR Professionals</h2>
        <p className="text-gray-600 mt-2">
          Browse and contact HR professionals for your business needs
        </p>
      </div>
      
      {selectedHr ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">
            Contact {selectedHr.name}
            {selectedHr.company && ` from ${selectedHr.company}`}
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message... Explain what you're looking for and how they can help you."
            className="w-full h-32 p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex space-x-4">
            <Button onClick={() => handleContact(selectedHr)}>
              Send Message
            </Button>
            <Button variant="outline" onClick={() => setSelectedHr(null)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hrUsers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No HR professionals available at the moment.</p>
            </div>
          ) : (
            hrUsers.map((hr) => (
              <div key={hr.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">{hr.name}</h3>
                {hr.company && (
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Company:</span> {hr.company}
                  </p>
                )}
                {hr.phone && (
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {hr.phone}
                  </p>
                )}
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {hr.email}
                </p>
                <Button
                  onClick={() => setSelectedHr(hr)}
                  className="mt-4 w-full"
                >
                  Contact HR
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}