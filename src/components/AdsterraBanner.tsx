
import { useRef, useEffect } from 'react';

interface AdsterraBannerProps {
  adKey: string;
  width: number;
  height: number;
}

const AdsterraBanner = ({ adKey, width, height }: AdsterraBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      // Check for a global lock. If an ad is already loading, wait and retry.
      if ((window as any).adsterraLoading) {
        setTimeout(loadAd, 200); // Poll every 200ms
        return;
      }

      // Make sure component is still mounted and ad not already injected
      if (bannerRef.current && !bannerRef.current.dataset.injected) {
        // Set the global lock
        (window as any).adsterraLoading = true;
        
        const container = bannerRef.current;

        const inlineScript = document.createElement('script');
        inlineScript.type = 'text/javascript';
        inlineScript.innerHTML = `
          atOptions = {
            'key' : '${adKey}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        `;
        
        const remoteScript = document.createElement('script');
        remoteScript.type = 'text/javascript';
        remoteScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
        remoteScript.async = true;

        // Release the lock once the script has loaded or failed
        remoteScript.onload = () => {
          (window as any).adsterraLoading = false;
        };
        remoteScript.onerror = () => {
          (window as any).adsterraLoading = false;
        };
        
        container.appendChild(inlineScript);
        container.appendChild(remoteScript);

        // Mark as injected to prevent re-injection
        container.dataset.injected = '1';
      }
    };
    
    loadAd();

  }, [adKey, width, height]);

  return (
    <div 
      ref={bannerRef}
      className="adsterra-banner"
      style={{ minHeight: height, width: '100%', maxWidth: width }}
    />
  );
};

export default AdsterraBanner;
