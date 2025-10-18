/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/auth';
import { api } from '@/lib/api';
import { WalletResponse, WalletCard } from '@/types/wallet';
import toast, { Toaster } from 'react-hot-toast';

export default function WalletsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, logout } = useAuthStore();
  const [walletData, setWalletData] = useState<WalletCard[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<WalletCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  const currentUser = session?.user || user;
  const isUserAuthenticated = !!currentUser;

  
  useEffect(() => {
    if (status === 'loading') return; 
    
    if (!isUserAuthenticated) {
      router.push('/auth');
    }
  }, [session, status, isUserAuthenticated, router]);


  useEffect(() => {
    const fetchWalletData = async () => {

      let token = user?.token; 
      
   
      const sessionWithToken = session as { accessToken?: string };
      if (session?.user && sessionWithToken?.accessToken) {
        token = sessionWithToken.accessToken;
        console.log('Using Google OAuth token for API calls');
      }

      
      if (session?.user && !token) {
        console.log('Google OAuth user detected but no API token available');
        console.log('Showing demo wallet data');
        
      
        setWalletData([
          {
            id: 'card_dashboard',
            name: 'Maglo Gold Card',
            type: 'credit',
            cardNumber: '5495 7381 3759 2321',
            bank: 'Maglo | Universal Bank',
            network: 'Visa',
            expiryMonth: 9,
            expiryYear: 2025,
            color: '#000000',
            isDefault: true 
          },
          {
            id: 'card_002', 
            name: 'Business Platinum',
            type: 'credit',
            cardNumber: '4532 1234 5678 9012',
            bank: 'Maglo | Universal Bank',
            network: 'Visa',
            expiryMonth: 12,
            expiryYear: 2027,
            color: '#1F2937',
            isDefault: false
          },
          {
            id: 'card_003',
            name: 'Savings Debit',
            type: 'debit',
            cardNumber: '4111 1111 1111 1111',
            bank: 'Maglo | Universal Bank', 
            network: 'Visa',
            expiryMonth: 6,
            expiryYear: 2026,
            color: '#10B981',
            isDefault: false
          }
        ]);

        setIsLoading(false);
        return;
      }

     
      if (!token) return;

      try {
        setIsLoading(true);
        console.log('Making API call to /financial/wallet/cards with token:', token);
        
        const response = await api.get<WalletResponse>('/financial/wallet/cards', token);
        
        if (response.success) {
          setWalletData(response.data.cards);
        }
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
        console.log('API call failed, showing demo wallet data:', errorMessage);
        
        
        setWalletData([
          {
            id: 'card_dashboard',
            name: 'Maglo Gold Card',
            type: 'credit',
            cardNumber: '5495 7381 3759 2321', 
            bank: 'Maglo | Universal Bank',
            network: 'Visa',
            expiryMonth: 9,
            expiryYear: 2025,
            color: '#000000', 
            isDefault: true 
          },
          {
            id: 'card_002', 
            name: 'Business Platinum',
            type: 'credit',
            cardNumber: '4532 1234 5678 9012',
            bank: 'Maglo | Universal Bank',
            network: 'Visa',
            expiryMonth: 12,
            expiryYear: 2027,
            color: '#1F2937',
            isDefault: false
          },
          {
            id: 'card_003',
            name: 'Savings Debit',
            type: 'debit',
            cardNumber: '4111 1111 1111 1111',
            bank: 'Maglo | Universal Bank', 
            network: 'Visa',
            expiryMonth: 6,
            expiryYear: 2026,
            color: '#10B981',
            isDefault: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isUserAuthenticated && currentUser) {
      fetchWalletData();
    }
  }, [isUserAuthenticated, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = async () => {
    if (session?.user) {
     
      await signOut({ callbackUrl: '/auth' });
    } else {
      
      logout();
      toast.success('Çıkış yapıldı');
      router.push('/auth');
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  const getCardNetworkIcon = (network: string) => {
    switch (network) {
      case 'Visa':
        return '/images/visa-logo.png';
      case 'Mastercard':
        return '/images/mastercard-logo.png';
      case 'American Express':
        return '/images/amex-logo.png';
      default:
        return '/images/visa-logo.png';
    }
  };

  const handleViewDetails = (card: WalletCard) => {
    setSelectedCard(card);
    setIsAnimating(true);
    setIsModalOpen(true);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeModal = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedCard(null);
      setIsAnimating(false);
    }, 300);
  };

  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
      </div>
    );
  }

  const isAuthenticated = session?.user || user;
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      
      
      <header className="bg-white">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900 mr-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Wallets</h1>
          </div>

         
          <div className="flex items-center space-x-4">
           
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
           
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5H15M5 7h5l5 5-5 5H5" />
              </svg>
            </button>

            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-black">
                  {(session?.user?.name || user?.fullName || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-gray-900">
                  {session?.user?.name || user?.fullName || 'Kullanıcı'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-3 space-y-3">
            <button 
              onClick={() => {
                router.push('/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => {
                router.push('/transactions');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Transactions</span>
            </button>
            
            <button 
              onClick={() => {
                router.push('/wallets');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-gray-700 bg-gray-50 rounded-md flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Wallets</span>
            </button>
            
            <button 
              onClick={() => {
                router.push('/invoices');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Invoices</span>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full h-64 bg-gray-300 rounded-[15px] animate-pulse">
                  </div>
                ))}
              </div>
            </div>
          ) : walletData && walletData.length > 0 ? (
            <div className="space-y-8">
              
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-8">
                  Manage your credit and debit cards in one place
                </p>
              </div>

             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {walletData.map((card) => (
                  <div key={card.id} className="relative group">
                    
                    <div 
                      className="w-full h-64 rounded-[15px] p-6 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                      style={{ backgroundColor: card.color }}
                    >
                      
                      {card.isDefault && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-lime-400 text-black px-2 py-1 rounded-full text-xs font-medium">
                            Default
                          </span>
                        </div>
                      )}

                      
                      <div className="mb-8">
                        <h3 className="text-white font-bold text-lg">{card.bank}</h3>
                        <p className="text-gray-300 text-sm">{card.name}</p>
                      </div>

                     
                      <div className="mb-6">
                        <p className="text-white font-mono text-lg tracking-widest">
                          {formatCardNumber(card.cardNumber)}
                        </p>
                      </div>

                    
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        
                        <div>
                          <p className="text-gray-300 text-xs">Valid Thru</p>
                          <p className="text-white font-medium">
                            {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
                          </p>
                        </div>

                      
                        <div className="w-12 h-8">
                          <img 
                            src={getCardNetworkIcon(card.network)}
                            alt={card.network}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                   
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.type === 'credit' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-green-500 text-white'
                        }`}>
                          {card.type.toUpperCase()}
                        </span>
                      </div>

                      
                      <div className="absolute -right-20 -top-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
                      <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                    </div>

                   
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-[15px] flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleViewDetails(card)}
                          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{walletData.length}</h3>
                  <p className="text-gray-600">Total Cards</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {walletData.filter(card => card.type === 'credit').length}
                  </h3>
                  <p className="text-gray-600">Credit Cards</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {walletData.filter(card => card.type === 'debit').length}
                  </h3>
                  <p className="text-gray-600">Debit Cards</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                💳
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cards Found</h3>
              <p className="text-gray-600 mb-6">You haven&apos;t added any cards yet</p>
              <button className="bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 transition-colors">
                Add Your First Card
              </button>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && selectedCard && (
        <div className="fixed top-20 right-8 z-50">
          <div className={`bg-white rounded-2xl w-80 max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 transform transition-all duration-300 ease-out ${
            !isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}>
           
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Card Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

        
            <div className="p-6">
             
              <div style={{ 
                position: 'relative',
                marginBottom: '30px'
              }}>
           
                <div style={{
                  width: '100%',
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="/images/CardFont.png" 
                    alt="Card Front"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>

             
                <div style={{
                  position: 'absolute',
                  top: '100px',
                  width: '90%',
                  left: '5%',
                  height: '130px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  border: '0.5px solid rgba(255, 255, 255, 0.3)',
                  opacity: 1,
                  zIndex: 10
                }}>
                  <img 
                    src="/images/CardBack.png" 
                    alt="Card Back"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

               
               
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '20px',
                  fontFamily: 'Gordita, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 1)',
                  zIndex: 20
                }}>
                  Maglo.
                </div>

                <div style={{
                  position: 'absolute',
                  top: '17px',
                  left: '65px',
                  fontFamily: 'Gordita, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  color: 'rgba(98, 98, 97, 1)',
                  zIndex: 20
                }}>
                  | Universal Bank
                </div>

                <div style={{
                  position: 'absolute',
                  top: '45px',
                  left: '20px',
                  width: '30px',
                  height: '24px',
                  zIndex: 20
                }}>
                  <img 
                    src="/images/compass-icon.png" 
                    alt="Compass"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  top: '75px',
                  left: '20px',
                  fontFamily: 'Gordita, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '8%',
                  color: 'rgba(255, 255, 255, 1)',
                  zIndex: 20
                }}>
                  {selectedCard.cardNumber}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '42px',
                  right: '20px',
                  width: '28px',
                  height: '20px',
                  zIndex: 20
                }}>
                  <img 
                    src="/images/wifi.png" 
                    alt="WiFi"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

               
                <div style={{
                  position: 'absolute',
                  top: '110px',
                  left: '25px',
                  fontFamily: 'Gordita, sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 1)',
                  zIndex: 30
                }}>
                  Maglo.
                </div>

                <div style={{
                  position: 'absolute',
                  top: '130px',
                  left: '25px',
                  width: '25px',
                  height: '20px',
                  zIndex: 30
                }}>
                  <img 
                    src="/images/compass-icon.png" 
                    alt="Compass"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  top: '155px',
                  left: '25px',
                  fontFamily: 'Gordita, sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '8%',
                  color: 'rgba(27, 33, 45, 1)',
                  zIndex: 30
                }}>
                  {formatCardNumber(selectedCard.cardNumber)}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '175px',
                  left: '25px',
                  fontFamily: 'Gordita, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  letterSpacing: '2%',
                  color: 'rgba(146, 158, 174, 1)',
                  zIndex: 30
                }}>
                  {String(selectedCard.expiryMonth).padStart(2, '0')}/{selectedCard.expiryYear}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '190px',
                  right: '25px',
                  width: '25px',
                  height: '16px',
                  zIndex: 30
                }}>
                  <img 
                    src={getCardNetworkIcon(selectedCard.network)}
                    alt={selectedCard.network}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>

             
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
                  <p className="text-gray-900 font-semibold">{selectedCard.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedCard.type === 'credit' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedCard.type.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                  <p className="text-gray-900">{selectedCard.bank}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <p className="text-gray-900 font-mono">{formatCardNumber(selectedCard.cardNumber)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expires</label>
                    <p className="text-gray-900">
                      {String(selectedCard.expiryMonth).padStart(2, '0')}/{selectedCard.expiryYear}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                    <p className="text-gray-900">{selectedCard.network}</p>
                  </div>
                </div>

                {selectedCard.isDefault && (
                  <div className="bg-lime-100 border border-lime-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-lime-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lime-800 font-medium">Default Card</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}