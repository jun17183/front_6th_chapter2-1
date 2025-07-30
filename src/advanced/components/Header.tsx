import React from 'react';

interface HeaderProps {
  itemCount: number;
}

/**
 * 애플리케이션 헤더 컴포넌트 - basic 버전과 동일한 UI
 */
export const Header: React.FC<HeaderProps> = ({ itemCount }) => {
  const itemText = itemCount === 1 ? 'item' : 'items';
  
  return (
    <div className="mb-8">
      <h1 className="text-xs font-medium tracking-extra-wide uppercase mb-2">
        🛒 Hanghae Online Store
      </h1>
      <div className="text-5xl tracking-tight leading-none">Shopping Cart</div>
      <p id="item-count" className="text-sm text-gray-500 font-normal mt-3">
        🛍️ {itemCount} {itemText} in cart
      </p>
    </div>
  );
};