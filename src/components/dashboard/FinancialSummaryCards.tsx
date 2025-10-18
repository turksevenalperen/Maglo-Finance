import { FinancialSummary } from '@/types/dashboard';

interface FinancialSummaryCardsProps {
  dashboardData: FinancialSummary;
  formatCurrency: (amount: number, currency?: string) => string;
}

export default function FinancialSummaryCards({ dashboardData, formatCurrency }: FinancialSummaryCardsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
      <div className="w-full sm:w-56 h-[105px] bg-gray-800 rounded-[10px] p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 -mt-1">
          <div className="w-[42px] h-[42px] rounded flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/balance-icon.png" 
              alt="Balance Icon"
              className="w-[42px] h-[42px] object-contain"
            />
          </div>
          <h3 className="font-normal" style={{
            fontFamily: 'Kumbh Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
            color: 'rgba(146, 158, 174, 1)'
          }}>Total balance</h3>
        </div>
        <div className="pl-13 -mb-1">
          <p className="text-white font-bold leading-none" style={{
            fontFamily: 'Kumbh Sans, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>
            {formatCurrency(dashboardData.totalBalance.amount, 'USD')}
          </p>
        </div>
      </div>
      
      <div className="w-full sm:w-56 h-[105px] bg-[#F8F8F8] rounded-[10px] p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/spending-icon.png" 
              alt="Spending Icon"
              className="w-[42px] h-[42px] object-contain"
            />
          </div>
          <h3 className="font-normal" style={{
            fontFamily: 'Kumbh Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
            color: 'rgba(146, 158, 174, 1)'
          }}>Total spending</h3>
        </div>
        <div className="pl-13">
          <p className="text-gray-900 font-bold leading-none" style={{
            fontFamily: 'Kumbh Sans, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>
            {formatCurrency(dashboardData.totalExpense.amount, 'USD')}
          </p>
        </div>
      </div>
      
      <div className="w-full sm:w-56 h-[105px] bg-[#F8F8F8] rounded-[10px] p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/saved-icon.png" 
              alt="Saved Icon"
              className="w-[42px] h-[42px] object-contain"
            />
          </div>
          <h3 className="font-normal" style={{
            fontFamily: 'Kumbh Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
            color: 'rgba(146, 158, 174, 1)'
          }}>Total saved</h3>
        </div>
        <div className="pl-13">
          <p className="text-gray-900 font-bold leading-none" style={{
            fontFamily: 'Kumbh Sans, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>
            {formatCurrency(dashboardData.totalSavings.amount, 'USD')}
          </p>
        </div>
      </div>
    </div>
  );
}