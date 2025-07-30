import React from 'react';
import { CartItem } from '../types';

interface CartItemListProps {
  items: CartItem[];
  onQuantityChange: (productId: string, change: number) => void;
  onRemove: (productId: string) => void;
}

/**
 * 장바구니 아이템 리스트 컴포넌트 - basic 버전과 동일한 UI
 */
export const CartItemList: React.FC<CartItemListProps> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  const renderCartItem = (item: CartItem, index: number) => {
    let priceDisplay = '';
    let namePrefix = '';
    
    if (item.isOnSale || item.isSuggestedSale) {
      const colorClass = item.isOnSale && item.isSuggestedSale ? 'text-purple-600' : 
                       item.isOnSale ? 'text-red-500' : 'text-blue-500';
      priceDisplay = `<span class="line-through text-gray-400">₩${item.originalPrice.toLocaleString()}</span> <span class="${colorClass}">₩${item.price.toLocaleString()}</span>`;
      namePrefix = item.isOnSale && item.isSuggestedSale ? '⚡💝' : 
                   item.isOnSale ? '⚡' : '💝';
    } else {
      priceDisplay = `₩${item.price.toLocaleString()}`;
    }

    return (
      <div
        key={item.id}
        id={item.id}
        className="grid grid-cols-[80px_1fr_auto] gap-5 py-5 border-b border-gray-100 first:pt-0 last:border-b-0 last:pb-0"
      >
        <div className="w-20 h-20 bg-gradient-black relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] bg-white/10 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        </div>
        
        <div>
          <h3 className="text-base font-normal mb-1 tracking-tight">
            {namePrefix}{item.name}
          </h3>
          <p className="text-xs text-gray-500 mb-0.5 tracking-wide">PRODUCT</p>
          <p 
            className="text-xs text-black mb-3"
            dangerouslySetInnerHTML={{ __html: priceDisplay }}
          />
          <div className="flex items-center gap-4">
            <button
              className="quantity-change w-6 h-6 border border-black bg-white text-sm flex items-center justify-center transition-all hover:bg-black hover:text-white"
              data-product-id={item.id}
              data-change="-1"
              onClick={() => onQuantityChange(item.id, -1)}
            >
              −
            </button>
            <span className="quantity-number text-sm font-normal min-w-[20px] text-center tabular-nums">
              {item.quantity}
            </span>
            <button
              className="quantity-change w-6 h-6 border border-black bg-white text-sm flex items-center justify-center transition-all hover:bg-black hover:text-white"
              data-product-id={item.id}
              data-change="1"
              onClick={() => onQuantityChange(item.id, 1)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <div 
            className="text-lg mb-2 tracking-tight tabular-nums"
            dangerouslySetInnerHTML={{ __html: priceDisplay }}
            style={{ fontWeight: item.quantity >= 10 ? 'bold' : 'normal' }}
          />
          <a
            className="remove-item text-2xs text-gray-500 uppercase tracking-wider cursor-pointer transition-colors border-b border-transparent hover:text-black hover:border-black"
            data-product-id={item.id}
            onClick={() => onRemove(item.id)}
          >
            Remove
          </a>
        </div>
      </div>
    );
  };

  return <div id="cart-items">{items.map(renderCartItem)}</div>;
};