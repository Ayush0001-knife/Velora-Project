import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMessageSquare, FiActivity, FiMoon, FiHeart, FiHelpCircle, FiSearch } from 'react-icons/fi';
import { Apple, Activity, Brain, Moon, MessageSquare } from 'lucide-react';
import DoctorNavbar from './DoctorNavbar';
import KnowledgeBaseSearch from './KnowledgeBaseSearch';
import PatientList from './PatientList';
import { patientAllData, patientGet } from '../services/api';
// Removed KnowledgeBaseSearch import as it's no longer needed

const assistants = [
  { id: 'nutrition', name: 'Nutrition', icon: <Apple className="w-5 h-5 text-green-500" /> },
  { id: 'exercise', name: 'Exercise', icon: <Activity className="w-5 h-5 text-blue-500" /> },
  { id: 'mental-health', name: 'Mental Health', icon: <Brain className="w-5 h-5 text-purple-500" /> },
  { id: 'sleep', name: 'Sleep Quality', icon: <Moon className="w-5 h-5 text-indigo-500" /> },
  { id: 'generic', name: 'Generic', icon: <MessageSquare className="w-5 h-5 text-gray-500" /> },
];

const ChatPage = () => {
  const { t } = useTranslation();
  const [activeChat, setActiveChat] = useState('nutrition');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter patients based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient => {
        const fullName = `${patient.first_name || ''} ${patient.last_name || ''}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  // Fetch patients on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await patientGet();
        setPatients(response);
        setFilteredPatients(response); // Initialize filtered patients with all patients
      } catch (error) {
        console.error('Error fetching patient list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    
    // TODO: Add API call to send message to the assistant
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      <DoctorNavbar />
      <div className="flex-1 flex px-24 py-4 overflow-hidden">
        {/* Sidebar with chat assistants */}
        <div className="w-64 bg-slate-800 p-4 overflow-y-auto rounded-l-xl">
          <h2 className="text-lg font-semibold mb-4 text-white">Assistants</h2>
          <div className="space-y-2">
            {assistants.map((assistant) => (
              <button
                key={assistant.id}
                onClick={() => setActiveChat(assistant.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeChat === assistant.id 
                    ? 'bg-slate-700 text-white' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <span className="text-xl">{assistant.icon}</span>
                <span className="font-medium">{assistant.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden border-x border-slate-200">
          {/* Chat header */}
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {assistants.find(a => a.id === activeChat)?.name} Assistant
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <FiMessageSquare className="mx-auto text-4xl mb-2 opacity-40" />
                  <p className="text-slate-500">Send a message to start chatting with the assistant</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message input */}
          <div className="bg-white border-t border-slate-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Patient Selector */}
        <div className="w-80 bg-white overflow-hidden flex flex-col border-l border-slate-200 rounded-r-xl">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Patients</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedPatient?.id === patient.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <p className="text-slate-800 font-medium">
                        {patient.first_name} {patient.last_name}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    <p>No patients found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
