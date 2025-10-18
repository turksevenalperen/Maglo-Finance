/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';
import { TransactionsResponse } from '@/types/chart';

interface RecentTransactionsProps {
  transactionsData: TransactionsResponse['data'] | null;
  formatCurrency: (amount: number, currency?: string) => string;
}

export default function RecentTransactions({ transactionsData, formatCurrency }: RecentTransactionsProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow w-full rounded-lg p-4 lg:p-6">
      <div className="border-b flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button 
          onClick={() => router.push('/transactions?source=dashboard')}
          className="hover:opacity-80 transition-opacity text-green-600 font-semibold text-sm"
        >
          View All
        </button>
      </div>
      <div>
        {transactionsData && transactionsData.transactions.length > 0 ? (
          <div>
        
            <div className="hidden sm:grid grid-cols-4 gap-4 pb-3 mb-4 border-b border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">NAME/BUSINESS</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TYPE</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">AMOUNT</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">DATE</div>
            </div>
            
          
            <div className="space-y-3">
              {transactionsData.transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="sm:grid sm:grid-cols-4 gap-4 py-3 hover:bg-gray-50 rounded-lg transition-colors items-center">
                  <div className="flex items-center space-x-3 sm:col-span-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                      {transaction.image ? (
                        <img 
                          src={transaction.image} 
                          alt={transaction.business}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="fallback-icon w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs" style={{display: transaction.image ? 'none' : 'flex'}}>
                        {transaction.business.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm">{transaction.name}</p>
                      <p className="text-xs text-gray-500 truncate">{transaction.business}</p>
                    </div>
                  </div>
                  
                  <div className="sm:flex sm:justify-start hidden">
                    <span className="text-sm text-gray-700">{transaction.type}</span>
                  </div>
                  
                  <div className="sm:text-right flex sm:justify-end justify-between items-center mt-2 sm:mt-0">
                    <span className="sm:hidden text-xs text-gray-500 mr-2">{transaction.type}</span>
                    <p className={`font-semibold text-sm ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      {formatCurrency(transaction.amount, 'USD')}
                    </p>
                  </div>
                  
                  <div className="sm:text-right mt-1 sm:mt-0">
                    <p className="text-sm text-gray-700">
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {transactionsData.summary && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Income</p>
                    <p className="font-semibold text-green-600">
                      {formatCurrency(transactionsData.summary.totalIncome, 'USD')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="font-semibold text-red-600">
                      {formatCurrency(Math.abs(transactionsData.summary.totalExpense), 'USD')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transaction Count</p>
                    <p className="font-semibold text-gray-900">{transactionsData.summary.count}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              💳
            </div>
            <p>Loading transactions...</p>
          </div>
        )}
      </div>
    </div>
  );
}