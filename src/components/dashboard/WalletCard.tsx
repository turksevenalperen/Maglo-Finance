/* eslint-disable @next/next/no-img-element */
export default function WalletCard() {
  return (
    <div className="bg-white shadow rounded-lg p-3 sm:p-5 w-full max-w-[354px] xl:w-[354px] mx-auto xl:mx-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Wallet</h3>
        <button 
          className="hover:opacity-70 transition-opacity p-1"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg 
            width="16.67" 
            height="3.67" 
            viewBox="0 0 17 4" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="1.5" fill="rgba(146, 158, 174, 1)"/>
            <circle cx="8.5" cy="2" r="1.5" fill="rgba(146, 158, 174, 1)"/>
            <circle cx="15" cy="2" r="1.5" fill="rgba(146, 158, 174, 1)"/>
          </svg>
        </button>
      </div>
      
      <div className="relative mt-8 mb-5 max-w-full overflow-hidden">
        <div className="w-full rounded-2xl overflow-hidden relative min-h-[320px]">
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
          top: '135px',
          left: '0',
          right: '0',
          height: '172px',
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
          top: '150px',
          left: '30px',
          width: '58px',
          height: '23px',
          opacity: 1,
          zIndex: 30,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          Maglo.
        </div>

        
        <div style={{
          position: 'absolute',
          top: '152px',
          left: '85px',
          width: '90px',
          height: '17px',
          opacity: 1,
          zIndex: 30,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: 'rgba(245, 245, 245, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          | Universal Bank
        </div>

       
        <div style={{
          position: 'absolute',
          top: '195px', 
          left: '30px',
          width: '37.92px',
          height: '30px',
          opacity: 1,
          zIndex: 30
        }}>
          <img 
            src="/images/compass-icon.png" 
            alt="Compass"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

     
        <div style={{
          position: 'absolute',
          top: '190.75px', 
          right: '30px',
          width: '35px',
          height: '26px',
          opacity: 1,
          zIndex: 30,
          borderWidth: '2px'
        }}>
          <img 
            src="/images/wifi.png" 
            alt="WiFi"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        <div style={{
          position: 'absolute',
          top: '235px', 
          left: '30px',
          width: '238px',
          height: '24px',
          opacity: 1,
          zIndex: 30,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '10%',
          color: 'rgba(27, 33, 45, 1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          85952548****
        </div>

     
        <div style={{
          position: 'absolute',
          top: '257px', 
          left: '30px',
          width: '47px',
          height: '17px',
          opacity: 1,
          zIndex: 30,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '2%',
          color: 'rgba(146, 158, 174, 1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          09/25
        </div>

      
        <div style={{
          position: 'absolute',
          top: '268px',
          right: '30px',
          width: '32px',
          height: '21px',
          opacity: 1,
          zIndex: 30
        }}>
          <img 
            src="/images/visa-logo.png" 
            alt="Visa"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '30px',
          width: '58px',
          height: '23px',
          opacity: 1,
          zIndex: 20,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          Maglo.
        </div>

        
        <div style={{
          position: 'absolute',
          top: '17px',
          left: '85px',
          width: '90px',
          height: '17px',
          opacity: 1,
          zIndex: 20,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: 'rgba(98, 98, 97, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          | Universal Bank
        </div>

        
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '30px',
          width: '37.92px',
          height: '30px',
          opacity: 1,
          zIndex: 20
        }}>
          <img 
            src="/images/compass-icon.png" 
            alt="Compass"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '30px',
          width: '238px',
          height: '24px',
          opacity: 1,
          zIndex: 20,
          fontFamily: 'Gordita, sans-serif',
          fontWeight: 700,
          fontSize: '17px',
          lineHeight: '100%',
          letterSpacing: '10%',
          color: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          alignItems: 'center'
        }}>
          5495 7381 3759 2321
        </div>

       
        <div style={{
          position: 'absolute',
          top: '55.75px',
          right: '30px',
          width: '35px',
          height: '26px',
          opacity: 1,
          zIndex: 20,
          borderWidth: '2px'
        }}>
          <img 
            src="/images/wifi.png" 
            alt="WiFi"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
}