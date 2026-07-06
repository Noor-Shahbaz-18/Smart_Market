import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from '../../components/admin/AdminDashboard/AdminDashboard';
import UserManagement from '../../components/admin/UserManagement/UserManagement';
import ListingManagement from '../../components/admin/ListingManagement/ListingManagement';
import PlatformStats from '../../components/admin/PlatformStats/PlatformStats';
import ReportedContent from '../../components/admin/ReportedContent/ReportedContent';
import ActivityMonitor from '../../components/admin/ActivityMonitor/ActivityMonitor';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="listings" element={<ListingManagement />} />
        <Route path="stats" element={<PlatformStats />} />
        <Route path="reports" element={<ReportedContent />} />
        <Route path="activity" element={<ActivityMonitor />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;