'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/auth';
import { api } from '@/lib/api';
import { DashboardResponse, FinancialSummary } from '@/types/dashboard';
import { TransactionsResponse } from '@/types/chart';
import { ScheduledTransfersResponse } from '@/types/transfers';
import FinancialSummaryCards from '@/components/dashboard/FinancialSummaryCards';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import WalletCard from '@/components/dashboard/WalletCard';
import ScheduledTransfers from '@/components/dashboard/ScheduledTransfers';
import WorkingCapitalChart from '@/components/dashboard/WorkingCapitalChart';

import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, logout } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<FinancialSummary | null>(null);
  const [transactionsData, setTransactionsData] = useState<TransactionsResponse['data'] | null>(null);
  const [scheduledTransfersData, setScheduledTransfersData] = useState<ScheduledTransfersResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser = useMemo(() => session?.user || user, [session?.user, user]);
  const isUserAuthenticated = !!currentUser;

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!isUserAuthenticated) {
      router.push('/auth');
    }
  }, [session, status, isUserAuthenticated, router]);

  useEffect(() => {
    const fetchAllData = async () => {
      let token = user?.token; 
      
      const sessionWithToken = session as { accessToken?: string };
      if (session?.user && sessionWithToken?.accessToken) {
        token = sessionWithToken.accessToken;
        console.log('Using Google OAuth token for API calls');
      }

      
      if (session?.user && !token) {
        console.log('Google OAuth user detected but no API token available');
        console.log('Session data:', {
          user: session.user.email,
          hasToken: !!sessionWithToken?.accessToken
        });
        console.log('Showing demo data');
        
      
        setDashboardData({
          totalBalance: {
            amount: 125000,
            currency: 'USD',
            change: { percentage: 12.5, trend: 'up' }
          },
          totalSavings: {
            amount: 45000,
            currency: 'USD', 
            change: { percentage: 8.2, trend: 'up' }
          },
          totalExpense: {
            amount: 32000,
            currency: 'USD',
            change: { percentage: 3.1, trend: 'down' }
          },
          lastUpdated: new Date().toISOString()
        });

        setTransactionsData({
          transactions: [
            {
              id: '1',
              name: 'Salary Payment',
              business: 'Tech Corp',
              amount: 15000,
              currency: 'USD',
              date: new Date().toISOString(),
              type: 'Income',
              status: 'completed',
              image: ''
            },
            {
              id: '2', 
              name: 'Grocery Shopping',
              business: 'Walmart',
              amount: -850,
              currency: 'USD',
              date: new Date(Date.now() - 86400000).toISOString(),
              type: 'Expense',
              status: 'completed',
              image: ''
            },
            {
              id: '3',
              name: 'Electricity Bill',
              business: 'Power Company',
              amount: -420,
              currency: 'USD', 
              date: new Date(Date.now() - 172800000).toISOString(),
              type: 'Bill',
              status: 'completed',
              image: ''
            }
          ],
          summary: {
            totalIncome: 15000,
            totalExpense: -1270,
            count: 3
          }
        });

        setScheduledTransfersData({
          transfers: [
            {
              id: 'sch_001',
              name: 'Saleh Ahmed',
              image: 'https://ui-avatars.com/api/?name=Saleh+Ahmed&background=random&size=100',
              date: new Date(Date.now() + 86400000 * 2).toISOString(), 
              amount: -435,
              currency: '$',
              status: 'scheduled'
            },
            {
              id: 'sch_002',
              name: 'Emily Johnson',
              image: 'https://ui-avatars.com/api/?name=Emily+Johnson&background=random&size=100',
              date: new Date(Date.now() + 86400000 * 5).toISOString(),
              amount: -1200,
              currency: '$',
              status: 'scheduled'
            },
            {
              id: 'sch_003',
              name: 'Michael Chen',
              image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random&size=100',
              date: new Date(Date.now() + 86400000 * 7).toISOString(), 
              amount: -750,
              currency: '$',
              status: 'processing'
            }
          ],
          summary: {
            totalScheduledAmount: -2385,
            count: 3
          }
        });

        setIsLoading(false);
        return;
      }

      
      if (!token) return;

      try {
        setIsLoading(true);
        console.log('Making API calls with token:', token);
        
        
        const [summaryResponse, transactionsResponse, scheduledTransfersResponse] = await Promise.all([
          api.get<DashboardResponse>('/financial/summary', token),
          api.get<TransactionsResponse>('/financial/transactions/recent?limit=10', token),
          api.get<ScheduledTransfersResponse>('/financial/transfers/scheduled', token),
        ]);
        
        if (summaryResponse.success) {
          setDashboardData(summaryResponse.data);
        }
        
        if (transactionsResponse.success) {
          setTransactionsData(transactionsResponse.data);
        }
        
        if (scheduledTransfersResponse.success) {
          setScheduledTransfersData(scheduledTransfersResponse.data);
        }
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
        toast.error(errorMessage);
        console.error('API call error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isUserAuthenticated && currentUser) {
      fetchAllData();
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

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isProfileDropdownOpen && !target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isProfileDropdownOpen) {
          setIsProfileDropdownOpen(false);
        }
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isProfileDropdownOpen]);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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

           
            <div className="flex items-center space-x-3 relative profile-dropdown">
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
                onClick={toggleProfileDropdown}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

         
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-black">
                          {(session?.user?.name || user?.fullName || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {session?.user?.name || user?.fullName || 'Kullanıcı'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session?.user?.email || user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                      </svg>
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
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
              className="w-full text-left py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md flex items-center space-x-3"
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
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 max-w-full">
            <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full sm:w-56 h-[105px] bg-gray-300 rounded-[10px] animate-pulse">
                    </div>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : dashboardData ? (
              <div className="space-y-6">
                
                <FinancialSummaryCards 
                  dashboardData={dashboardData} 
                  formatCurrency={formatCurrency}
                />

               
               
                <WorkingCapitalChart />                
                <RecentTransactions 
                  transactionsData={transactionsData}
                  formatCurrency={formatCurrency}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  ⚠️
                </div>
                <p className="text-gray-600">Error loading data</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
          
          <div className="xl:w-[354px] w-full flex flex-col gap-6">
            <WalletCard />
            
            <ScheduledTransfers 
              scheduledTransfersData={scheduledTransfersData}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
        </main>
    </>
  );
}