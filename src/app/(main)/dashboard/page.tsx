// src/app/(main)/dashboard/page.tsx
'use client';

import React from 'react';

const DashboardPage: React.FC = () => {
  // Mock statistics data
  const stats = [
    { label: 'Total Products', value: 120 },
    { label: 'Product Categories', value: 15 },
    { label: 'Items in Stock', value: 2500 },
    { label: 'Low Stock Alerts', value: 8 },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;