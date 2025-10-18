/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';
import { ScheduledTransfersResponse } from '@/types/transfers';

interface ScheduledTransfersProps {
  scheduledTransfersData: ScheduledTransfersResponse['data'] | null;
  formatCurrency: (amount: number, currency?: string) => string;
}

export default function ScheduledTransfers({ scheduledTransfersData, formatCurrency }: ScheduledTransfersProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow rounded-lg p-5 w-full max-w-[354px] xl:w-[354px] mx-auto xl:mx-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Scheduled Transfer</h3>
        <button 
          onClick={() => router.push('/transactions?source=dashboard')}
          className="hover:opacity-80 transition-opacity text-green-600 font-semibold text-sm"
        >
          View All
        </button>
      </div>
      
      {scheduledTransfersData && scheduledTransfersData.transfers.length > 0 ? (
        <div className="space-y-3">
          {scheduledTransfersData.transfers.slice(0, 3).map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
             
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                  {transfer.image ? (
                    <img 
                      src={transfer.image} 
                      alt={transfer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="fallback-icon w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs" style={{display: transfer.image ? 'none' : 'flex'}}>
                    {transfer.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate text-sm">{transfer.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(transfer.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
             
              <div className="text-right">
                <p className="font-semibold text-sm text-red-600">
                  {formatCurrency(transfer.amount, 'USD')}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  transfer.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  transfer.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  transfer.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transfer.status}
                </span>
              </div>
            </div>
          ))}
          
          {scheduledTransfersData.summary && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Scheduled</span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(scheduledTransfersData.summary.totalScheduledAmount, 'USD')}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-500">Transfer Count</span>
                <span className="font-semibold text-gray-900">{scheduledTransfersData.summary.count}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            📅
          </div>
          <p>No scheduled transfers</p>
        </div>
      )}
    </div>
  );
}