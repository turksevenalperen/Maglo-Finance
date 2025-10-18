/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/auth';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { logout } = useAuthStore();

  const handleLogoutClick = async () => {
    if (session?.user) {
      await signOut({ callbackUrl: '/auth' });
    } else {
      logout();
      router.push('/auth');
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '/images/dashboard-icon.png',
      href: '/dashboard',
      active: pathname === '/dashboard'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: '/images/transactions-icon.png', 
      href: '/transactions',
      active: pathname === '/transactions'
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: '/images/invoices-icon.png', 
      href: '/invoices',
      active: pathname === '/invoices'
    },
    {
      id: 'wallets',
      label: 'My Wallets',
      icon: '/images/wallets-icon.png', 
      href: '/wallets',
      active: pathname === '/wallets'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '/images/settings-icon.png', 
      href: '/settings',
      active: pathname === '/settings',
      disabled: true
    }
  ];

  const handleMenuClick = (href: string) => {
    router.push(href);
   
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

    

  return (
    <>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

     
      <div className={`
        fixed left-0 top-0 z-50 h-screen w-[250px] bg-gray-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
        flex flex-col
        px-[25px] pt-[30px] pb-[100px]
      `}>
        
       
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Image 
              src="/images/maglo-logo.png" 
              alt="Maglo Logo" 
              width={122}
              height={30}
              className="w-[122px] h-[30px]"
            />
          </div>
        </div>

       
        <nav className="flex-1">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.disabled && handleMenuClick(item.href)}
                aria-disabled={item.disabled ? true : undefined}
                className={`
                  w-full flex items-center gap-3 text-left
                  rounded-lg px-[15px] py-[14px] h-12
                  transition-all duration-200 ease-in-out
                  ${item.active
                    ? 'bg-lime-400 text-black font-medium'
                    : item.disabled ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
             
                {item.icon.startsWith('/') ? (
                  <img 
                    src={item.icon} 
                    alt={`${item.label} Icon`}
                    className="w-5 h-5 object-contain"
                    style={{
                      width: '20px',
                      height: '20px',
                      opacity: 1
                    }}
                  />
                ) : (
                  <span className="text-lg">{item.icon}</span>
                )}
                <span style={{
                  width: item.active ? '72px' : '82px',
                  height: '17px',
                  fontFamily: 'Kumbh Sans, sans-serif',
                  fontWeight: item.active ? 600 : 500,
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: item.active ? 'black' : 'rgba(146, 158, 174, 1)',
                  opacity: 1
                }}>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

    
        <div className="mt-auto">
          <button
        
            onClick={() => {}}
            aria-disabled={true}
            className="w-full flex items-center gap-3 text-left text-gray-400 hover:bg-gray-100 rounded-lg px-[15px] py-[14px] h-12 transition-all duration-200"
          >
           
            <img 
              src="/images/help-icon.png" 
              alt="Help Icon"
              className="w-5 h-5 object-contain"
              style={{
                width: '20px',
                height: '20px',
                opacity: 1
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'inline';
              }}
            />
            <span className="text-lg" style={{ display: 'none' }}>❓</span>
            <span style={{
              width: '32px',
              height: '17px',
              fontFamily: 'Kumbh Sans, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: 'rgba(146, 158, 174, 1)',
              opacity: 1
            }}>Help</span>
          </button>
          
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 text-left text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-[15px] py-[14px] h-12 transition-all duration-200 mt-1"
          >
            
            <img 
              src="/images/logout-icon.png" 
              alt="Logout Icon"
              className="w-5 h-5 object-contain"
              style={{
                width: '20px',
                height: '20px',
                opacity: 1
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'inline';
              }}
            />
            <span className="text-lg" style={{ display: 'none' }}>🚪</span>
            <span style={{
              width: '43px',
              height: '17px',
              fontFamily: 'Kumbh Sans, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: 'rgba(146, 158, 174, 1)',
              opacity: 1
            }}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}