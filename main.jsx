import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import { SocketProvider } from './context/SocketContext/SocketProvider';
import { NotificationProvider } from './context/NotificationContext/NotificationProvider';
import { ThemeProvider } from './context/ThemeContext/ThemeProvider';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <App />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);