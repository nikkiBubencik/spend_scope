'use client';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './LayoutShell.module.css';
import React, { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: RootLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    setShowSidebar(prev => !prev);
  }

  return (
    <div className={styles.layout}>
      <Header toggleSidebar={toggleSidebar} />
      <div className={styles.mainLayout}>
        {showSidebar && (
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
        )}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
