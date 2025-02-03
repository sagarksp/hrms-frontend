'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#82dd97] text-white z-10 py-3 h-[40px]">
      <div className="footer-content">
        <div className="relative bottom-[6px] text-center w-full text-[15px]">
          <span className="text-black">&copy; 2024 Gigantic. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;