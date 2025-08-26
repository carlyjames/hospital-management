"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '../../components/Layout/header.jsx';
import Sidebar from '../../components/Layout/sidebar.jsx';

export default function DashboardClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </div>
    </QueryClientProvider>
  );
}