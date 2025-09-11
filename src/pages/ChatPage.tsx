
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

// Mock data for conversations
const conversations = [
  { id: 1, name: 'General Discussion', unread: 3, type: 'group' },
  { id: 2, name: 'Dr. Sarah Johnson', unread: 0, type: 'faculty' },
  { id: 3, name: 'Prof. Michael Chen', unread: 2, type: 'faculty' },
  { id: 4, name: 'CS301 Group', unread: 5, type: 'course' },
  { id: 5, name: 'Web Dev Team', unread: 0, type: 'group' },
  { id: 6, name: 'AI Research Group', unread: 1, type: 'group' },
  { id: 7, name: 'Priya Sharma', unread: 0, type: 'student' },
  { id: 8, name: 'Rajesh Singh', unread: 0, type: 'student' },
];

// Mock data for messages in active conversation
const mockMessages = [
  { id: 1, sender: 'Arun Kumar', text: 'Has everyone started working on the final project?', time: '10:23 AM', isCurrentUser: false },
  { id: 2, sender: 'Priya Sharma', text: 'Yes, I\'ve begun the research phase. Planning to use React for the frontend.', time: '10:25 AM', isCurrentUser: false },
  { id: 3, sender: 'Me', text: 'I\'m working on the database schema currently. Should be done by tomorrow.', time: '10:26 AM', isCurrentUser: true },
  { id: 4, sender: 'Rajesh Singh', text: 'I\'ll be handling the back-end with Node.js. Anyone interested in collaborating?', time: '10:28 AM', isCurrentUser: false },
  { id: 5, sender: 'Me', text: 'I can help with the back-end too. Let\'s discuss the API endpoints tomorrow.', time: '10:30 AM', isCurrentUser: true },
  { id: 6, sender: 'Priya Sharma', text: 'That sounds good. I\'ll share my component structure by evening so we can align.', time: '10:32 AM', isCurrentUser: false },
  { id: 7, sender: 'Arun Kumar', text: 'Great progress, team! Let\'s meet online tomorrow at 5 PM to sync up.', time: '10:35 AM', isCurrentUser: false },
  { id: 8, sender: 'Me', text: 'Works for me. I\'ll prepare a short demo of the database schema by then.', time: '10:36 AM', isCurrentUser: true },
  { id: 9, sender: 'Rajesh Singh', text: 'I\'ll be ready with the initial API documentation as well.', time: '10:38 AM', isCurrentUser: false },
];

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState(conversations[3]); // Default to CS301 Group
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(
    convo => convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Me',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <Button className="mt-2 md:mt-0">Start New Conversation</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversations Sidebar */}
        <Card className="lg:col-span-1 h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Conversations</CardTitle>
            <div className="relative mt-2">
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-grow">
            <div className="space-y-1">
              {filteredConversations.map((convo) => (
                <div
                  key={convo.id}
                  onClick={() => setActiveConversation(convo)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                    activeConversation.id === convo.id
                      ? 'bg-secondary'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center 
                      ${convo.type === 'course' ? 'bg-blue-100 text-blue-600' : 
                        convo.type === 'faculty' ? 'bg-purple-100 text-purple-600' : 
                        convo.type === 'student' ? 'bg-green-100 text-green-600' : 
                        'bg-gray-100 text-gray-600'}`}
                    >
                      {convo.type === 'group' || convo.type === 'course' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{convo.name}</p>
                      <p className="text-xs text-gray-500">
                        {convo.type === 'course' ? 'Course Group' : 
                          convo.type === 'faculty' ? 'Faculty' : 
                          convo.type === 'student' ? 'Student' : 
                          'Group Chat'}
                      </p>
                    </div>
                  </div>
                  {convo.unread > 0 && (
                    <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {convo.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 h-full flex flex-col">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center 
                  ${activeConversation.type === 'course' ? 'bg-blue-100 text-blue-600' : 
                    activeConversation.type === 'faculty' ? 'bg-purple-100 text-purple-600' : 
                    activeConversation.type === 'student' ? 'bg-green-100 text-green-600' : 
                    'bg-gray-100 text-gray-600'}`}
                >
                  {activeConversation.type === 'group' || activeConversation.type === 'course' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div>
                  <CardTitle>{activeConversation.name}</CardTitle>
                  <CardDescription>
                    {activeConversation.type === 'course' ? 'Course Group Chat' : 
                     activeConversation.type === 'faculty' ? 'Faculty Member' : 
                     activeConversation.type === 'student' ? 'Student' : 
                     'Group Discussion'}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-grow p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${msg.isCurrentUser ? 'bg-primary text-white' : 'bg-secondary'} rounded-lg p-3`}>
                  {!msg.isCurrentUser && (
                    <p className="font-medium text-xs mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs ${msg.isCurrentUser ? 'text-primary-foreground/70' : 'text-gray-500'} text-right mt-1`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="w-full flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
