'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingSocial } from './FloatingSocial';
import { EnquiryModal } from './EnquiryModal';
import { SideEnquiryGesture } from './SideEnquiryGesture';

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isBookingPage = pathname?.startsWith('/book');
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    if (isBookingPage || isAdmin) return;
    const timer = setTimeout(() => setShowEnquiry(true), 5000);
    return () => clearTimeout(timer);
  }, [isBookingPage, isAdmin]);

  function openEnquiry() {
    setShowEnquiry(true);
  }

  function closeEnquiry() {
    setShowEnquiry(false);
  }

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingSocial />
      <SideEnquiryGesture onClick={openEnquiry} />
      {!isBookingPage && <EnquiryModal isOpen={showEnquiry} onClose={closeEnquiry} />}
    </>
  );
}
