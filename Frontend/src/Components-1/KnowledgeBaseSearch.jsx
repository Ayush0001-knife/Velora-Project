import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import axios from 'axios';

const KnowledgeBaseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching knowledge bases...');
        
        // Get token from localStorage
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          console.log('No access token found in localStorage');
          throw new Error('Please log in to SmartQuery Healthcare first. No authentication token found.');
        }
        
        console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
        
        // Prepare request details according to the API documentation
        const requestDetails = {
          url: '/api/kb/list',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            page: 1,
            page_size: 100,
            orderby: 'create_time',
            desc: true
          }
        };
        
        console.log('API Request:', JSON.stringify(requestDetails, null, 2));
        
        // The actual API endpoint we'll be calling
        const apiUrl = '/api/kb/list';
        console.log('Making request to:', apiUrl);
        console.log('Using token:', token ? 'Token found (first 10 chars): ' + token.substring(0, 10) + '...' : 'No token found');
        
        // Make the API request
        const response = await axios({
          ...requestDetails,
          withCredentials: true,
          timeout: 10000
        });
        
        console.log('API Response Status:', response.status);
        console.log('API Response Headers:', response.headers);
        console.log('API Response Data:', response.data);
        
        // Check if response is successful but has no data
        if (!response.data) {
          console.warn('Empty response from server');
          setKnowledgeBases([]);
          return [];
        }
        
        // Handle the response format according to the API documentation
        const responseData = response.data;
        
        if (!responseData || typeof responseData !== 'object') {
          console.warn('Invalid response format from server:', responseData);
          throw new Error('Invalid response format from server');
        }
        
        // Check for error response
        if (responseData.code !== 0) {
          console.warn('API returned an error:', responseData.message || 'Unknown error');
          throw new Error(responseData.message || 'Failed to fetch knowledge bases');
        }
        
        // Extract the data array from the response
        const bases = Array.isArray(responseData.data) ? responseData.data : [];
        
        const formattedBases = bases.map(kb => ({
          id: kb.id || String(Math.random()).substring(2, 10),
          name: kb.name || 'Unnamed Knowledge Base',
          description: kb.description || 'No description available',
          created_at: kb.created_at || new Date().toISOString(),
          ...kb
        }));
        
        console.log('Successfully formatted knowledge bases:', formattedBases);
        setKnowledgeBases(formattedBases);
        return formattedBases;
      } catch (error) {
        // Log detailed error information
        const errorDetails = {
          name: error.name,
          message: error.message,
          ...(error.config && {
            request: {
              url: error.config.url,
              method: error.config.method,
              headers: error.config.headers,
              params: error.config.params,
              data: error.config.data
            }
          }),
          ...(error.response && {
            response: {
              status: error.response.status,
              statusText: error.response.statusText,
              headers: error.response.headers,
              data: error.response.data
            }
          }),
          stack: error.stack
        };
        
        console.error('API Error Details:', JSON.stringify(errorDetails, null, 2));
        
        // User-friendly error message
        let errorMessage = 'Failed to load knowledge bases';
        
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;
          errorMessage = `Error ${status}: ${data?.message || error.response.statusText || 'Unknown error'}`;
          
          if (status === 401) {
            errorMessage = 'Session expired. Please log in again.';
          } else if (status === 403) {
            errorMessage = 'You do not have permission to access this resource.';
          } else if (status === 404) {
            errorMessage = 'The requested resource was not found.';
          } else if (status >= 500) {
            errorMessage = 'Server error. Please try again later or contact support.';
          }
        } else if (error.request) {
          // Request was made but no response
          errorMessage = 'No response from server. Please check your connection and try again.';
        } else {
          // Other errors
          errorMessage = error.message || 'An unexpected error occurred.';
        }
        
        setError(errorMessage);
        setKnowledgeBases([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKnowledgeBases();
  }, []);

  const filteredBases = knowledgeBases.filter(base =>
    base.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search knowledge bases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {error ? (
              <div className="px-4 py-2 text-sm text-red-500">{error}</div>
            ) : isLoading ? (
              <div className="px-4 py-2 text-sm text-gray-500">Loading knowledge bases...</div>
            ) : filteredBases.length > 0 ? (
              filteredBases.map((base) => (
                <div
                  key={base.id}
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    setSelectedBase(base);
                    setSearchTerm(base.name);
                    setIsOpen(false);
                    // TODO: Handle knowledge base selection
                    console.log('Selected knowledge base:', base);
                  }}
                >
                  <div className="font-medium">{base.name}</div>
                  {base.description && (
                    <div className="text-xs text-gray-500 truncate">{base.description}</div>
                  )}
                </div>
              ))
            ) : searchTerm ? (
              <div className="px-4 py-2 text-sm text-gray-500">No knowledge bases match your search</div>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No knowledge bases available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseSearch;
