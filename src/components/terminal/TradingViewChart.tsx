import React, { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
  container: string;
  theme?: 'light' | 'dark';
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  container,
  theme = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: container,
          symbol: `FX:${symbol.replace('/', '')}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: theme,
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          height: '100%',
          width: '100%',
          studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies',
          ],
          disabled_features: [
            'header_symbol_search',
            'header_settings',
            'header_compare',
          ],
          enabled_features: [
            'study_templates',
            'use_localstorage_for_settings',
          ],
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, container, theme]);

  return <div id={container} ref={containerRef} className="w-full h-full" />;
};

export default TradingViewChart;