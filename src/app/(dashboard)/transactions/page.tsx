/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/auth';
import { api } from '@/lib/api';
import { TransactionsResponse, Transaction } from '@/types/chart';
import toast, { Toaster } from 'react-hot-toast';

function TransactionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { user, logout } = useAuthStore();
  const [transactionsData, setTransactionsData] = useState<TransactionsResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7days' | '30days' | '90days' | 'all'>('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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
    const source = searchParams?.get('source');
    if (source === 'dashboard') {
      setSelectedTimeRange('30days');
      toast.success('Showing dashboard-related transactions');
    }
  }, [searchParams]);


  useEffect(() => {
    const fetchTransactionData = async () => {
      let token = user?.token;
      
      const sessionWithToken = session as { accessToken?: string };
      if (session?.user && sessionWithToken?.accessToken) {
        token = sessionWithToken.accessToken;
      }

      
        if (session?.user && !token) {
          const demoTransactions: Transaction[] = [
           
            {
              id: 'trx_001',
              name: 'Salary Payment',
              business: 'Tech Corp',
              amount: 15000,
              currency: 'USD',
              date: new Date().toISOString(),
              type: 'Salary',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Tech+Corp&background=2563eb&color=fff&size=100'
            },
            {
              id: 'trx_002',
              name: 'Grocery Shopping',
              business: 'Walmart',
              amount: -850,
              currency: 'USD',
              date: new Date(Date.now() - 86400000).toISOString(),
              type: 'Groceries',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Walmart&background=f59e0b&color=fff&size=100'
            },
            {
              id: 'trx_003',
              name: 'Electricity Bill',
              business: 'Power Company',
              amount: -420,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 2).toISOString(),
              type: 'Utilities',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Power+Co&background=0ea5e9&color=fff&size=100'
            },
            
            {
              id: 'trx_004',
              name: 'Freelance Project',
              business: 'Digital Agency',
              amount: 3500,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 3).toISOString(),
              type: 'Freelance',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Digital+Agency&background=10b981&color=fff&size=100'
            },
            {
              id: 'trx_005',
              name: 'Investment Dividend',
              business: 'Stock Portfolio',
              amount: 850,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 5).toISOString(),
              type: 'Investment',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Investment&background=8b5cf6&color=fff&size=100'
            },
            {
              id: 'trx_006',
              name: 'Netflix Subscription',
              business: 'Netflix',
              amount: -15.99,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 7).toISOString(),
              type: 'Entertainment',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Netflix&background=ef4444&color=fff&size=100'
            },
            {
              id: 'trx_007',
              name: 'Spotify Premium',
              business: 'Spotify',
              amount: -9.99,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 8).toISOString(),
              type: 'Entertainment',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Spotify&background=22c55e&color=fff&size=100'
            },
            {
              id: 'trx_008',
              name: 'Gas Station',
              business: 'Shell',
              amount: -65,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 4).toISOString(),
              type: 'Transportation',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Shell&background=f97316&color=fff&size=100'
            },
            {
              id: 'trx_009',
              name: 'Restaurant Dinner',
              business: 'Italian Bistro',
              amount: -125,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 6).toISOString(),
              type: 'Dining',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Italian+Bistro&background=dc2626&color=fff&size=100'
            },
            {
              id: 'trx_010',
              name: 'Online Course',
              business: 'Udemy',
              amount: -89.99,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 10).toISOString(),
              type: 'Education',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Udemy&background=6366f1&color=fff&size=100'
            },
            {
              id: 'trx_011',
              name: 'Internet Bill',
              business: 'ISP Company',
              amount: -79.99,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 12).toISOString(),
              type: 'Utilities',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=ISP&background=06b6d4&color=fff&size=100'
            },
            {
              id: 'trx_012',
              name: 'Coffee Shop',
              business: 'Starbucks',
              amount: -12.50,
              currency: 'USD',
              date: new Date(Date.now() - 86400000 * 9).toISOString(),
              type: 'Dining',
              status: 'completed',
              image: 'https://ui-avatars.com/api/?name=Starbucks&background=059669&color=fff&size=100'
            }
          ];        const summary = {
          totalIncome: demoTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
          totalExpense: Math.abs(demoTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
          count: demoTransactions.length
        };

        setTransactionsData({
          transactions: demoTransactions,
          summary
        });

        setIsLoading(false);
        return;
      }

      if (!token) return;

      try {
        setIsLoading(true);
        const response = await api.get<TransactionsResponse>('/financial/transactions/recent?limit=50', token);
        
        if (response.success) {
          setTransactionsData(response.data);
        }
        
      } catch (error: unknown) {
        console.log('API call failed, using demo data', error);
        
   
        const demoTransactions: Transaction[] = [
          {
            id: 'trx_001',
            name: 'Salary Payment',
            business: 'Tech Corp',
            amount: 15000,
            currency: 'USD',
            date: new Date().toISOString(),
            type: 'Salary',
            status: 'completed',
            image: 'https://ui-avatars.com/api/?name=Tech+Corp&background=2563eb&color=fff&size=100'
          },
          {
            id: 'trx_002',
            name: 'Grocery Shopping',
            business: 'Walmart',
            amount: -850,
            currency: 'USD',
            date: new Date(Date.now() - 86400000).toISOString(),
            type: 'Groceries',
            status: 'completed',
            image: 'https://ui-avatars.com/api/?name=Walmart&background=f59e0b&color=fff&size=100'
          },
          {
            id: 'trx_003',
            name: 'Electricity Bill',
            business: 'Power Company',
            amount: -420,
            currency: 'USD',
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            type: 'Utilities',
            status: 'completed',
            image: 'https://ui-avatars.com/api/?name=Power+Co&background=0ea5e9&color=fff&size=100'
          }
        ];

        const summary = {
          totalIncome: demoTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
          totalExpense: Math.abs(demoTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
          count: demoTransactions.length
        };

        setTransactionsData({
          transactions: demoTransactions,
          summary
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isUserAuthenticated && currentUser) {
      fetchTransactionData();
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

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
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


  const filteredTransactions = transactionsData?.transactions.filter(transaction => {
    const matchesCategory = selectedCategory === 'all' || transaction.type === selectedCategory;
    
    const matchesSearch = searchTerm === '' || 
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.business.toLowerCase().includes(searchTerm.toLowerCase());
    
  
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    const timeDiff = now.getTime() - transactionDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const matchesTimeRange = selectedTimeRange === 'all' ||
      (selectedTimeRange === '7days' && daysDiff <= 7) ||
      (selectedTimeRange === '30days' && daysDiff <= 30) ||
      (selectedTimeRange === '90days' && daysDiff <= 90);
    
    return matchesCategory && matchesSearch && matchesTimeRange;
  }) || [];


  const categories = Array.from(new Set(transactionsData?.transactions.map(t => t.type) || []));


  const filteredSummary = {
    totalIncome: filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
    totalExpense: Math.abs(filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
    count: filteredTransactions.length
  };

  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          closeModal();
        } else if (isProfileDropdownOpen) {
          setIsProfileDropdownOpen(false);
        }
      }
    };

    if (isModalOpen || isProfileDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen, isProfileDropdownOpen]);

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
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
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
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
              className="w-full text-left py-2 px-3 text-gray-700 bg-gray-50 rounded-md flex items-center space-x-3"
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
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-300 rounded-lg h-24 animate-pulse"></div>
                ))}
              </div>
              <div className="bg-gray-300 rounded-lg h-96 animate-pulse"></div>
            </div>
          ) : transactionsData ? (
            <div className="space-y-8">
             
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Income</dt>
                        <dd className="text-lg font-semibold text-green-600">{formatCurrency(filteredSummary.totalIncome)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                        <dd className="text-lg font-semibold text-red-600">{formatCurrency(filteredSummary.totalExpense)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Net Balance</dt>
                        <dd className={`text-lg font-semibold ${
                          (filteredSummary.totalIncome - filteredSummary.totalExpense) >= 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {formatCurrency(filteredSummary.totalIncome - filteredSummary.totalExpense)}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

            
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-lime-400 focus:border-lime-400"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value as '7days' | '30days' | '90days' | 'all')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-lime-400 focus:border-lime-400"
                    >
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                      <option value="90days">Last 90 Days</option>
                      <option value="all">All Time</option>
                    </select>
                  </div>

                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-lime-400 focus:border-lime-400"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

           
              <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Transactions ({filteredSummary.count})
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img 
                                  className="h-10 w-10 rounded-full"
                                  src={transaction.image}
                                  alt={transaction.business}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {transaction.business}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                              {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredTransactions.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        💳
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ⚠️
              </div>
              <p className="text-gray-600">Error loading transactions</p>
            </div>
          )}
        </div>
      </main>

     
      {isModalOpen && selectedTransaction && (
        <div className="fixed top-20 right-8 z-50">
          <div className="bg-white rounded-2xl w-96 max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 transform transition-all duration-300 ease-out">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  className="h-16 w-16 rounded-full"
                  src={selectedTransaction.image}
                  alt={selectedTransaction.business}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedTransaction.name}</h3>
                  <p className="text-gray-600">{selectedTransaction.business}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className={`text-xl font-bold ${selectedTransaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedTransaction.amount > 0 ? '+' : '-'}{formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{formatDate(selectedTransaction.date)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {selectedTransaction.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <p className="text-gray-600 font-mono text-sm">{selectedTransaction.id}</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-lime-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-lime-500 transition-colors">
                  Edit Transaction
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
      </div>
    }>
      <TransactionsContent />
    </Suspense>
  );
}