import { useState, useCallback, useMemo } from 'react';
import { Product, CartItem, CartState, UseCartReturn } from '../types';
import { usePoints } from './usePoints';

/**
 * 장바구니 관리를 위한 커스텀 훅
 */
export const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { calculatePoints } = usePoints();

  const cartState: CartState = useMemo(() => {
    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    // 기본 계산 (할인 전) - 항상 originalPrice 기준
    const subtotal = cartItems.reduce((acc, item) => 
      acc + (item.originalPrice * item.quantity), 0
    );

    // basic 모듈과 동일한 방식으로 할인 계산
    let totalAmount = 0;

    // 개별 상품별 계산 (번개세일/추천할인이 적용된 현재 가격 사용)
    cartItems.forEach(item => {
      // 번개세일/추천할인이 적용된 현재 가격 사용
      const currentPrice = item.price;
      const itemTotal = currentPrice * item.quantity;
      let discount = 0;
      
      // 10개 이상 구매 시 개별 할인 적용 (현재 가격 기준)
      if (item.quantity >= 10) {
        if (item.id === 'p1') discount = 0.1;        // 키보드 10%
        else if (item.id === 'p2') discount = 0.15;  // 마우스 15%
        else if (item.id === 'p3') discount = 0.2;   // 모니터암 20%
        else if (item.id === 'p4') discount = 0.05;  // 노트북파우치 5%
        else if (item.id === 'p5') discount = 0.25;  // 스피커 25%
      }
      
      totalAmount += itemTotal * (1 - discount);
    });

    // 대량구매 할인 (30개 이상 시 개별 할인 무시하고 전체 25% 할인)
    if (totalItemCount >= 30) {
      // 대량구매 할인은 번개세일/추천할인이 적용된 가격들의 합계에서 25% 할인
      const currentSubtotal = cartItems.reduce((acc, item) => 
        acc + (item.price * item.quantity), 0
      );
      totalAmount = currentSubtotal * 0.75; // 25% 할인
    }

    // 화요일 할인 (10% 추가 할인)
    const isTuesday = new Date().getDay() === 2;
    if (isTuesday && totalAmount > 0) {
      totalAmount = totalAmount * 0.9; // 10% 추가 할인
    }

    totalAmount = Math.round(totalAmount);

    // 할인 정보 계산 (원가 대비 최종 할인 금액)
    let discountInfo = null;
    if (subtotal > totalAmount) {
      const discountAmount = subtotal - totalAmount;
      const discountRate = discountAmount / subtotal;
      
      let description = '';
      const hasLightningSale = cartItems.some(item => item.isOnSale);
      const hasSuggestedSale = cartItems.some(item => item.isSuggestedSale);
      const hasIndividualDiscount = cartItems.some(item => item.quantity >= 10);
      const isTuesday = new Date().getDay() === 2;
      
      // 할인 내역 설명 (번개세일/추천할인은 이미 가격에 반영되어 있으므로 제외)
      const discountTypes = [];
      
      if (totalItemCount >= 30) {
        discountTypes.push('대량구매 할인 (25%)');
      } else if (hasIndividualDiscount) {
        discountTypes.push('개별 상품 할인');
      }
      
      if (isTuesday) {
        discountTypes.push('화요일 할인 (10%)');
      }
      
      // 번개세일/추천할인만 있고 다른 할인이 없으면 할인 정보 표시하지 않음
      if (discountTypes.length > 0) {
        description = discountTypes.join(' + ');
        
        discountInfo = {
          rate: discountRate,
          amount: discountAmount,
          type: totalItemCount >= 30 ? 'bulk' as const : 'individual' as const,
          description
        };
      }
    }

    // 포인트 계산
    const pointsInfo = calculatePoints({
      items: cartItems,
      totalAmount,
      totalItemCount,
      discountInfo,
      pointsInfo: { base: 0, bonus: 0, total: 0, description: [], isTuesdayDouble: false }
    });

    return {
      items: cartItems,
      totalAmount,
      totalItemCount,
      discountInfo,
      pointsInfo,
    };
  }, [cartItems, calculatePoints]);

  const addToCart = useCallback((product: Product) => {
    // 재고 검증은 App 컴포넌트에서 이미 처리됨
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // 재고 검증은 App 컴포넌트에서 이미 처리됨
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const updateCartItemPrices = useCallback((updatedProducts: Product[]) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        const updatedProduct = updatedProducts.find(p => p.id === item.id);
        if (updatedProduct) {
          return {
            ...item,
            price: updatedProduct.price,
            originalPrice: updatedProduct.originalPrice,
            isOnSale: updatedProduct.isOnSale,
            isSuggestedSale: updatedProduct.isSuggestedSale,
          };
        }
        return item;
      })
    );
  }, []);

  return {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateCartItemPrices,
  };
};