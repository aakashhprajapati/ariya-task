'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface ClientContact {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  contactMessage: string;
  contactDate: string;
}

export default function HRDashboard() {
  const [clients, setClients] = useState<ClientContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyClients();
  }, []);

  const fetchMyClients = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('/api/users/my-clients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      alert('Failed to load client contacts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading client contacts...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Clients Who Contacted You</h2>
        <p className="text-gray-600 mt-2">
          View and manage all client contact requests
        </p>
      </div>
      
      {clients.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 text-lg">No clients have contacted you yet.</p>
          <p className="text-gray-400 mt-2">Client contact requests will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-gray-600">Email: {client.email}</p>
                  {client.company && (
                    <p className="text-gray-600">Company: {client.company}</p>
                  )}
                  {client.phone && (
                    <p className="text-gray-600">Phone: {client.phone}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {new Date(client.contactDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">Contact Message:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{client.contactMessage}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}