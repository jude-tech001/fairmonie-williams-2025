
import React, { useState } from 'react';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import { toast } from '@/hooks/use-toast';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  if (!user) {
    return <Auth onLogin={handleAuthSuccess} />;
  }

  return (
    <Dashboard 
      user={user} 
      onAddMoney={() => {}} 
      onLogout={handleLogout}
    />
  );
};

export default Index;
