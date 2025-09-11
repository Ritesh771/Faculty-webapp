import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/logo';

const Index: React.FC = () => {
  console.log('Index page rendering...');
  
  const { user, loading } = useAuth();
  
  console.log('Auth state:', { user, loading });

  // If user is loading, show loading indicator
  if (loading) {
    console.log('Showing loading state');
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Logo size="lg" className="h-16 sm:h-20" />
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold">AMC College</h2>
            <p className="text-sm sm:text-base font-medium text-gray-600">Loading NeuroCampus...</p>
          </div>
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // If user is already logged in, redirect to dashboard
  if (user) {
    console.log('User logged in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise show login form (route kept for root entry), but prefer dedicated auth route
  console.log('Showing login form');
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
};

export default Index;
