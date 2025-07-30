import React from 'react';
import { CartState, Product } from '../types';
import { isTuesday } from '../utils/dateUtils';

interface CartTotalProps {
  cartState: CartState;
  lowStockItems: Product[];
  outOfStockItems: Product[];
}

/**
 * 장바구니 총계 컴포넌트 - basic 버전과 동일한 UI
 */
export const CartTotal: React.FC<CartTotalProps> = ({
  cartState,
  lowStockItems,
  outOfStockItems,
}) => {
  const { items, totalAmount, discountInfo, pointsInfo } = cartState;
  const tuesdaySpecial = isTuesday();

  const renderSummaryDetails = () => {
    if (items.length === 0) {
      return <p className="text-sm text-gray-400">장바구니가 비어있습니다.</p>;
    }

    let subtotal = 0;
    const summaryItems = items.map(item => {
      // 번개세일/추천할인이 적용된 현재 가격 사용
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      return (
        <div key={item.id} className="flex justify-between text-xs tracking-wide text-gray-400">
          <span>{item.name} x {item.quantity}</span>
          <span>₩{itemTotal.toLocaleString()}</span>
        </div>
      );
    });

    // Subtotal 및 할인 정보 추가 (basic과 동일)
    if (subtotal > 0) {
      summaryItems.push(
        <div key="separator" className="border-t border-white/10 my-3"></div>
      );
      summaryItems.push(
        <div key="subtotal" className="flex justify-between text-sm tracking-wide">
          <span>Subtotal</span>
          <span>₩{subtotal.toLocaleString()}</span>
        </div>
      );

      // 할인 정보를 summary-details에 추가
      const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
      
      // 대량구매 할인 (30개 이상)
      if (totalItemCount >= 30) {
        summaryItems.push(
          <div key="bulk-discount" className="flex justify-between text-sm tracking-wide text-green-400">
            <span className="text-xs">🎉 대량구매 할인 (30개 이상)</span>
            <span className="text-xs">-25%</span>
          </div>
        );
      } else if (discountInfo && discountInfo.rate > 0) {
        // 개별 상품 할인
        summaryItems.push(
          <div key="item-discount" className="flex justify-between text-sm tracking-wide text-green-400">
            <span className="text-xs">{discountInfo.description}</span>
            <span className="text-xs">-{(discountInfo.rate * 100).toFixed(1)}%</span>
          </div>
        );
      }
      
      // 화요일 할인
      if (tuesdaySpecial && totalAmount > 0) {
        summaryItems.push(
          <div key="tuesday-discount" className="flex justify-between text-sm tracking-wide text-purple-400">
            <span className="text-xs">🌟 화요일 추가 할인</span>
            <span className="text-xs">-10%</span>
          </div>
        );
      }
      
      // Shipping
      summaryItems.push(
        <div key="shipping" className="flex justify-between text-sm tracking-wide text-gray-400">
          <span>Shipping</span>
          <span>Free</span>
        </div>
      );
    }

    return summaryItems;
  };

  // 할인 정보 포맷팅
  const formatDiscountInfo = () => {
    if (!discountInfo) return '';
    return `할인: ${(discountInfo.rate * 100).toFixed(1)}% (${discountInfo.description})`;
  };

  // 포인트 정보 포맷팅 (basic과 동일한 형태)
  const formatLoyaltyPoints = () => {
    if (pointsInfo.total === 0) return '적립 포인트: 0p';
    const descriptions = pointsInfo.description.join(', ');
    return `<div>적립 포인트: <span class="font-bold">${pointsInfo.total}p</span></div>` +
           `<div class="text-2xs opacity-70 mt-1">${descriptions}</div>`;
  };

  return (
    <>
      <h2 className="text-xs font-medium mb-5 tracking-extra-wide uppercase">
        Order Summary
      </h2>
      <div className="flex-1 flex flex-col">
        <div id="summary-details" className="space-y-3">
          {renderSummaryDetails()}
        </div>
        <div className="mt-auto">
          <div id="discount-info" className="mb-4">
            {discountInfo && totalAmount > 0 && (
              <div className="bg-green-500/20 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs uppercase tracking-wide text-green-400">총 할인율</span>
                  <span className="text-sm font-medium text-green-400">{(discountInfo.rate * 100).toFixed(1)}%</span>
                </div>
                <div className="text-2xs text-gray-300">₩{Math.round(discountInfo.amount).toLocaleString()} 할인되었습니다</div>
              </div>
            )}
          </div>
          <div id="cart-total" className="pt-5 border-t border-white/10">
            <div className="flex justify-between items-baseline">
              <span className="text-sm uppercase tracking-wider">Total</span>
              <div id="total-price" className="text-2xl tracking-tight">
                ₩{totalAmount.toLocaleString()}
              </div>
            </div>
            <div 
              id="loyalty-points" 
              className="text-xs text-blue-400 mt-2 text-right"
              style={{ display: items.length > 0 ? 'block' : 'none' }}
              dangerouslySetInnerHTML={{ __html: formatLoyaltyPoints() }}
            />
          </div>
          <div 
            id="tuesday-special" 
            className={`mt-4 p-3 bg-white/10 rounded-lg ${tuesdaySpecial && totalAmount > 0 ? '' : 'hidden'}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xs">🎉</span>
              <span className="text-xs uppercase tracking-wide">
                Tuesday Special 10% Applied
              </span>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full py-4 bg-white text-black text-sm font-normal uppercase tracking-super-wide cursor-pointer mt-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30">
        Proceed to Checkout
      </button>
      <p className="mt-4 text-2xs text-white/60 text-center leading-relaxed">
        Free shipping on all orders.<br />
        <span id="points-notice">Earn loyalty points with purchase.</span>
      </p>
    </>
  );
};