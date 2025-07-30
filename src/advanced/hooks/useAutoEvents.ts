import { useState, useCallback, useEffect, useRef } from 'react';
import { SaleEvent, UseAutoEventsReturn } from '../types';
import { AUTO_EVENT_CONFIG, DISCOUNT_POLICY, PRODUCT_LIST } from '../constants';

/**
 * 자동 이벤트 (번개세일, 추천할인)를 위한 커스텀 훅
 */
export const useAutoEvents = (): UseAutoEventsReturn => {
  const [activeSales, setActiveSales] = useState<SaleEvent[]>([]);
  const lightningTimerRef = useRef<number | null>(null);
  const suggestedTimerRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const startAutoEvents = useCallback((lastSelectedProductId: string) => {
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;

    // 번개세일 타이머 시작
    lightningTimerRef.current = setTimeout(() => {
      const interval = setInterval(() => {
        // 랜덤 상품 선택하여 번개세일 적용
        const randomProduct = PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];
        const lightningEvent: SaleEvent = {
          type: 'lightning',
          productId: randomProduct.id,
          originalPrice: randomProduct.originalPrice,
          discountedPrice: Math.round(randomProduct.originalPrice * (1 - DISCOUNT_POLICY.LIGHTNING_SALE_RATE)),
          discountRate: DISCOUNT_POLICY.LIGHTNING_SALE_RATE,
          startTime: new Date(),
        };
        
        setActiveSales(prev => {
          // 같은 상품의 기존 번개세일 제거
          const filtered = prev.filter(sale => 
            !(sale.productId === lightningEvent.productId && sale.type === 'lightning')
          );
          return [...filtered, lightningEvent];
        });
      }, AUTO_EVENT_CONFIG.LIGHTNING_SALE_INTERVAL);

      // 정리 함수 저장
      lightningTimerRef.current = interval;
    }, AUTO_EVENT_CONFIG.LIGHTNING_SALE_DELAY);

    // 추천할인 타이머 시작
    if (lastSelectedProductId) {
      suggestedTimerRef.current = setTimeout(() => {
        const interval = setInterval(() => {
          // 마지막 선택 상품과 다른 상품에 추천할인 적용
          const availableProducts = PRODUCT_LIST.filter(p => p.id !== lastSelectedProductId);
          if (availableProducts.length > 0) {
            const suggestedProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
            const suggestedEvent: SaleEvent = {
              type: 'suggested',
              productId: suggestedProduct.id,
              originalPrice: suggestedProduct.originalPrice,
              discountedPrice: Math.round(suggestedProduct.originalPrice * (1 - DISCOUNT_POLICY.SUGGESTED_SALE_RATE)),
              discountRate: DISCOUNT_POLICY.SUGGESTED_SALE_RATE,
              startTime: new Date(),
            };
            
            setActiveSales(prev => {
              const filtered = prev.filter(sale => 
                !(sale.productId === suggestedEvent.productId && sale.type === 'suggested')
              );
              return [...filtered, suggestedEvent];
            });
          }
        }, AUTO_EVENT_CONFIG.SUGGESTED_SALE_INTERVAL);

        suggestedTimerRef.current = interval;
      }, AUTO_EVENT_CONFIG.SUGGESTED_SALE_DELAY);
    }
  }, []);

  const stopAutoEvents = useCallback(() => {
    isRunningRef.current = false;
    
    if (lightningTimerRef.current) {
      clearTimeout(lightningTimerRef.current);
      clearInterval(lightningTimerRef.current);
      lightningTimerRef.current = null;
    }
    
    if (suggestedTimerRef.current) {
      clearTimeout(suggestedTimerRef.current);
      clearInterval(suggestedTimerRef.current);
      suggestedTimerRef.current = null;
    }
    
    setActiveSales([]);
  }, []);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      stopAutoEvents();
    };
  }, [stopAutoEvents]);

  return {
    activeSales,
    startAutoEvents,
    stopAutoEvents,
  };
};