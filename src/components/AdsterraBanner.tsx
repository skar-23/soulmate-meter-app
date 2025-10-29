
import { useRef, useEffect } from 'react';

interface AdsterraBannerProps {
  adKey: string;
  width: number;
  height: number;
}

const AdsterraBanner = ({ adKey, width, height }: AdsterraBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.dataset.injected) {
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

      container.appendChild(inlineScript);
      container.appendChild(remoteScript);

      // Mark as injected to prevent re-injection on re-renders
      container.dataset.injected = '1';
    }
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
