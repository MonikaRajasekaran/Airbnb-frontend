import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

function Structure(props) {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <Header />

      {/* Main content fills remaining space */}
      <main className="flex-grow">
        {props.children}
      </main>

      {/* Footer sticks to bottom */}
      <Footer />

    </div>
  );
}

export default Structure;
