import { useCallback } from 'react';
import { CartState, DiscountInfo, UseDiscountReturn } from '../types';
import { DISCOUNT_POLICY, PRODUCT_DISCOUNT_RATE, PRODUCT_IDS } from '../constants';
import { isTuesday } from '../utils/dateUtils';

/**
 * 할인 계산을 위한 커스텀 훅
 */
export const useDiscount = (): UseDiscountReturn => {
  
  const calculateDiscount = useCallback((cartState: CartState): DiscountInfo | null => {
    const { items, totalItemCount } = cartState;
    
    if (items.length === 0) {
      return null;
    }

    let discountRate = 0;
    let discountType: DiscountInfo['type'] = 'individual';
    let description = '';

    // 1. 대량구매 할인 확인 (30개 이상) - 최우선
    if (totalItemCount >= DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD) {
      discountRate = DISCOUNT_POLICY.BULK_PURCHASE_RATE;
      discountType = 'bulk';
      description = `대량구매 할인 (${totalItemCount}개)`;
    } else {
      // 2. 개별 상품 할인 확인 (10개 이상)
      let maxIndividualDiscount = 0;
      let discountedProduct = '';

      items.forEach(item => {
        if (item.quantity >= DISCOUNT_POLICY.INDIVIDUAL_DISCOUNT_THRESHOLD) {
          const productDiscountRate = PRODUCT_DISCOUNT_RATE[item.id] || 0;
          if (productDiscountRate > maxIndividualDiscount) {
            maxIndividualDiscount = productDiscountRate;
            discountedProduct = item.name;
          }
        }
      });

      if (maxIndividualDiscount > 0) {
        discountRate = maxIndividualDiscount;
        discountType = 'individual';
        description = `개별 상품 할인: ${discountedProduct}`;
      }
    }

    // 3. 화요일 할인 추가 적용
    if (isTuesday() && discountRate > 0) {
      // 화요일 할인은 기존 할인과 중복 적용
      // 예: 10% 할인 -> 10% 화요일 할인 = 19% (1 - 0.9 * 0.9 = 0.19)
      const finalRate = 1 - (1 - discountRate) * (1 - DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE);
      discountRate = finalRate;
      discountType = 'tuesday';
      description += ' + 화요일 할인';
    } else if (isTuesday() && discountRate === 0) {
      // 다른 할인이 없는 경우 화요일 할인만 적용
      discountRate = DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE;
      discountType = 'tuesday';
      description = '화요일 할인';
    }

    if (discountRate === 0) {
      return null;
    }

    // 할인 금액 계산
    const subtotal = items.reduce((acc, item) => 
      acc + (item.originalPrice * item.quantity), 0
    );
    const discountAmount = Math.round(subtotal * discountRate);

    return {
      rate: discountRate,
      amount: discountAmount,
      type: discountType,
      description,
    };
  }, []);

  const applyLightningSale = useCallback((productId: string) => {
    // 번개세일 로직은 상품 상태를 직접 변경하므로 
    // 실제로는 상품 관리 훅에서 처리해야 함
    console.log(`번개세일 적용: ${productId}`);
  }, []);

  const applySuggestedSale = useCallback((productId: string, lastSelectedProductId: string) => {
    // 추천할인 로직도 상품 상태를 직접 변경하므로
    // 실제로는 상품 관리 훅에서 처리해야 함
    console.log(`추천할인 적용: ${productId}, 마지막 선택: ${lastSelectedProductId}`);
  }, []);

  const resetSaleStatus = useCallback((productId: string) => {
    console.log(`세일 상태 초기화: ${productId}`);
  }, []);

  return {
    calculateDiscount,
    applyLightningSale,
    applySuggestedSale,
    resetSaleStatus,
  };
};