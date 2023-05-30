
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "./Logo.png"

interface HeaderProps {
  title: string;
}

const Header = () => {
  const headerStyles: React.CSSProperties = {
    position: 'relative',
    width: '310px',
    height: '90px',
    left: '651px',
    top: '30px',
  };

  return (
    <header style={headerStyles}>
      <Image src={logo} alt="Logo" />
    </header>
  );
};
export default Header;