import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { setApiBaseUrl } from '@/utils/config';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('API_BASE_URL') || 'http://127.0.0.1:8000/api');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (apiUrl && apiUrl.trim()) {
        setApiBaseUrl(apiUrl);
      }
      const res: any = await login(username, password);
      if (res?.success === false) {
        toast({
          title: "Login failed",
          description: res?.message || "Invalid username or password",
          variant: "destructive",
        });
        return;
      }
      if (res?.otpRequired) {
        navigate('/auth/otp');
        return;
      }
      toast({
        title: "Login successful",
        description: "Welcome to NeuroCampus!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Removed Quick Demo Access

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <motion.div 
        className="w-full max-w-md space-y-6 sm:space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo and Header */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Logo size="xl" className="h-20 sm:h-24 drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse-glow" />
            </motion.div>
          </div>
          <div className="space-y-3">
            
            <motion.h2 
              className="text-xl sm:text-2xl font-semibold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              NeuroCampus
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base text-muted-foreground font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Sign in to access your premium dashboard
            </motion.p>
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="premium-card border-0 shadow-premium backdrop-blur-xl">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl sm:text-3xl text-center font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base text-muted-foreground">
                Enter your credentials to continue your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="username" className="text-sm font-semibold text-foreground">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 text-sm sm:text-base border-2 border-border/50 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 text-sm sm:text-base border-2 border-border/50 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Label htmlFor="apiUrl" className="text-sm font-semibold text-foreground">
                    Backend URL
                  </Label>
                  <Input
                    id="apiUrl"
                    type="url"
                    placeholder="https://abcd-1234.ngrok-free.app/api"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    required
                    className="h-12 text-sm sm:text-base border-2 border-border/50 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-sm sm:text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow hover:shadow-xl relative overflow-hidden group" 
                    disabled={loading}
                  >
                    <span className="relative z-10">
                      {loading ? 'Signing in...' : 'Sign In'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </motion.div>
              </form>

              
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center text-xs sm:text-sm text-muted-foreground space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <p className="font-medium">&copy; 2024 AMC College. All rights reserved.</p>
          <p className="text-primary font-semibold">Powered by NeuroCampus</p>
        </motion.div>
      </motion.div>
    </div>
  );
};