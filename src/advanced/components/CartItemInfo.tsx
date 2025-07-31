import React from 'react';
import { CartItem } from '../types';
import { UI_CONSTANTS } from '../constants';
import { getCartItemNamePrefix } from '../utils';

interface CartItemInfoProps {
  item: CartItem;
  priceDisplay: string;
}

/**
 * 장바구니 아이템 정보 컴포넌트
 */
export const CartItemInfo: React.FC<CartItemInfoProps> = ({ item, priceDisplay }) => {
  const namePrefix = getCartItemNamePrefix(item);

  return (
    <div>
      <h3 className="text-base font-normal mb-1 tracking-tight">
        {namePrefix}{item.name}
      </h3>
      <p className="text-xs text-gray-500 mb-0.5 tracking-wide">{UI_CONSTANTS.TEXT.PRODUCT}</p>
      <p 
        className="text-xs text-black mb-3"
        dangerouslySetInnerHTML={{ __html: priceDisplay }}
      />
    </div>
  );
}; 