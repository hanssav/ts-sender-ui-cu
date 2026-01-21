'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface HeaderProps {
  title?: string;
  githubUrl?: string;
}

export default function Header({
  title = 'TSender Pro',
  githubUrl = 'https://github.com/hanssav/ts-sender-ui-cu',
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex items-center justify-between w-full px-4 py-4 mx-auto my-2 max-w-7xl'>
      {/* Left: GitHub Logo sebagai Logo Utama */}
      <div className='flex items-center gap-4'>
        <a
          href={githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-3 group'
          aria-label='GitHub Repository'
        >
          <div className='flex items-center justify-center w-10 h-10 text-white transition-transform bg-gray-900 rounded-full group-hover:scale-105 dark:bg-white dark:text-gray-900'>
            <FaGithub className='w-6 h-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              {title}
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Powered by GitHub
            </p>
          </div>
        </a>
      </div>

      {/* Right: Connect Button */}
      <ConnectButton
        label='Connect'
        // accountStatus='avatar'
        showBalance={false}
      />
    </div>
  );
}
