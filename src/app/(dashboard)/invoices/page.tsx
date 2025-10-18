'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/auth';
import { Invoice, InvoiceData } from '@/types/invoice';
import toast, { Toaster } from 'react-hot-toast';

export default function InvoicesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, logout } = useAuthStore();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'draft'>('all');
  const [searchTerm, setSearchTerm] = useState('');
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
    const loadInvoiceData = () => {
      setIsLoading(true);
      
     
      const mockInvoices: Invoice[] = [
        {
          id: 'inv_001',
          invoiceNumber: 'INV-2025-001',
          title: 'Website Development',
          clientName: 'Acme Corporation',
          clientEmail: 'info@acme.com',
          clientLogo: 'https://ui-avatars.com/api/?name=Acme+Corporation&background=2563eb&color=fff&size=100',
          amount: 15000,
          currency: 'USD',
          issueDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'paid',
          paidDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Complete website redesign and development',
          items: [
            { id: '1', description: 'Frontend Development', quantity: 1, unitPrice: 8000, total: 8000 },
            { id: '2', description: 'Backend API Development', quantity: 1, unitPrice: 5000, total: 5000 },
            { id: '3', description: 'UI/UX Design', quantity: 1, unitPrice: 2000, total: 2000 }
          ],
          taxRate: 0,
          taxAmount: 0,
          subtotal: 15000,
          total: 15000
        },
        {
          id: 'inv_002',
          invoiceNumber: 'INV-2025-002',
          title: 'Mobile App Development',
          clientName: 'TechStart Inc.',
          clientEmail: 'billing@techstart.com',
          clientLogo: 'https://ui-avatars.com/api/?name=TechStart+Inc&background=10b981&color=fff&size=100',
          amount: 25000,
          currency: 'USD',
          issueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          description: 'Cross-platform mobile application',
          items: [
            { id: '1', description: 'iOS Development', quantity: 1, unitPrice: 12000, total: 12000 },
            { id: '2', description: 'Android Development', quantity: 1, unitPrice: 10000, total: 10000 },
            { id: '3', description: 'Testing & QA', quantity: 1, unitPrice: 3000, total: 3000 }
          ],
          taxRate: 0,
          taxAmount: 0,
          subtotal: 25000,
          total: 25000
        },
        {
          id: 'inv_003',
          invoiceNumber: 'INV-2025-003',
          title: 'Consulting Services',
          clientName: 'Global Solutions Ltd.',
          clientEmail: 'finance@globalsolutions.com',
          clientLogo: 'https://ui-avatars.com/api/?name=Global+Solutions&background=f59e0b&color=fff&size=100',
          amount: 8500,
          currency: 'USD',
          issueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'overdue',
          description: 'Technical consulting and system architecture',
          items: [
            { id: '1', description: 'System Architecture Review', quantity: 1, unitPrice: 5000, total: 5000 },
            { id: '2', description: 'Performance Optimization', quantity: 1, unitPrice: 3500, total: 3500 }
          ],
          taxRate: 0,
          taxAmount: 0,
          subtotal: 8500,
          total: 8500
        },
        {
          id: 'inv_004',
          invoiceNumber: 'INV-2025-004',
          title: 'E-commerce Platform',
          clientName: 'RetailMax Pro',
          clientEmail: 'orders@retailmax.com',
          clientLogo: 'https://ui-avatars.com/api/?name=RetailMax+Pro&background=8b5cf6&color=fff&size=100',
          amount: 32000,
          currency: 'USD',
          issueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          description: 'Complete e-commerce solution with payment integration',
          items: [
            { id: '1', description: 'E-commerce Development', quantity: 1, unitPrice: 20000, total: 20000 },
            { id: '2', description: 'Payment Gateway Integration', quantity: 1, unitPrice: 8000, total: 8000 },
            { id: '3', description: 'Admin Dashboard', quantity: 1, unitPrice: 4000, total: 4000 }
          ],
          taxRate: 0,
          taxAmount: 0,
          subtotal: 32000,
          total: 32000
        },
        {
          id: 'inv_005',
          invoiceNumber: 'INV-2025-005',
          title: 'SaaS Platform Development',
          clientName: 'CloudTech Ventures',
          clientEmail: 'dev@cloudtech.io',
          clientLogo: 'https://ui-avatars.com/api/?name=CloudTech&background=ef4444&color=fff&size=100',
          amount: 45000,
          currency: 'USD',
          issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'draft',
          description: 'Multi-tenant SaaS platform with advanced analytics',
          items: [
            { id: '1', description: 'Platform Architecture', quantity: 1, unitPrice: 15000, total: 15000 },
            { id: '2', description: 'User Management System', quantity: 1, unitPrice: 12000, total: 12000 },
            { id: '3', description: 'Analytics Dashboard', quantity: 1, unitPrice: 10000, total: 10000 },
            { id: '4', description: 'API Development', quantity: 1, unitPrice: 8000, total: 8000 }
          ],
          taxRate: 0,
          taxAmount: 0,
          subtotal: 45000,
          total: 45000
        }
      ];

      
      const summary = {
        totalInvoices: mockInvoices.length,
        totalAmount: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
        paidAmount: mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
        pendingAmount: mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0),
        overdueAmount: mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0),
        paidCount: mockInvoices.filter(inv => inv.status === 'paid').length,
        pendingCount: mockInvoices.filter(inv => inv.status === 'pending').length,
        overdueCount: mockInvoices.filter(inv => inv.status === 'overdue').length,
      };

      setInvoiceData({
        invoices: mockInvoices,
        summary
      });

      setIsLoading(false);
    };

    if (isUserAuthenticated && currentUser) {
      loadInvoiceData();
    }
  }, [isUserAuthenticated, currentUser]);

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
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  
  const filteredInvoices = invoiceData?.invoices.filter(invoice => {
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  }) || [];

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
            <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
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
              className="w-full text-left py-2 px-3 text-gray-700 bg-gray-50 rounded-md flex items-center space-x-3"
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
             
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-300 rounded-lg h-24 animate-pulse"></div>
                ))}
              </div>
              <div className="bg-gray-300 rounded-lg h-96 animate-pulse"></div>
            </div>
          ) : invoiceData ? (
            <div className="space-y-8">
          
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Invoices</dt>
                        <dd className="text-lg font-semibold text-gray-900">{invoiceData.summary.totalInvoices}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Paid ({invoiceData.summary.paidCount})</dt>
                        <dd className="text-lg font-semibold text-green-600">{formatCurrency(invoiceData.summary.paidAmount)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending ({invoiceData.summary.pendingCount})</dt>
                        <dd className="text-lg font-semibold text-yellow-600">{formatCurrency(invoiceData.summary.pendingAmount)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Overdue ({invoiceData.summary.overdueCount})</dt>
                        <dd className="text-lg font-semibold text-red-600">{formatCurrency(invoiceData.summary.overdueAmount)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {['all', 'paid', 'pending', 'overdue', 'draft'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status as 'all' | 'paid' | 'pending' | 'overdue' | 'draft')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedStatus === status
                            ? 'bg-lime-400 text-black'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Invoices ({filteredInvoices.length})
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {invoice.invoiceNumber}
                              </div>
                              <div className="text-sm text-gray-500">
                                {invoice.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  className="h-10 w-10 rounded-full"
                                  src={invoice.clientLogo}
                                  alt={invoice.clientName}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {invoice.clientName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {invoice.clientEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(invoice.total, invoice.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(invoice.dueDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-lime-600 hover:text-lime-900 mr-3">
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredInvoices.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        📄
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
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
              <p className="text-gray-600">Error loading invoices</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}