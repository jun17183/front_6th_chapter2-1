import React from 'react';
import { Product } from '../types';

interface ProductSelectProps {
  products: Product[];
  selectedProductId: string;
  onProductSelect: (productId: string) => void;
  onAddToCart: () => void;
  stockStatus: string;
}

/**
 * 상품 선택 컴포넌트 - basic 버전과 동일한 UI
 */
export const ProductSelect: React.FC<ProductSelectProps> = ({
  products,
  selectedProductId,
  onProductSelect,
  onAddToCart,
  stockStatus,
}) => {
  const getProductOptionText = (product: Product): string => {
    let discountText = '';

    // 할인 상태 표시
    if (product.isOnSale) discountText += ' ⚡SALE';
    if (product.isSuggestedSale) discountText += ' 💝추천';

    // 품절 상품 처리
    if (product.stock === 0) {
      return `${product.name} - ${product.price}원 (품절)${discountText}`;
    } else {
      // 할인 상품 표시
      if (product.isOnSale && product.isSuggestedSale) {
        return `⚡💝${product.name} - ${product.originalPrice}원 → ${product.price}원 (25% SUPER SALE!)`;
      } else if (product.isOnSale) {
        return `⚡${product.name} - ${product.originalPrice}원 → ${product.price}원 (20% SALE!)`;
      } else if (product.isSuggestedSale) {
        return `💝${product.name} - ${product.originalPrice}원 → ${product.price}원 (5% 추천!)`;
      } else {
        return `${product.name} - ${product.price}원${discountText}`;
      }
    }
  };

  const getOptionClassName = (product: Product): string => {
    if (product.stock === 0) {
      return 'text-gray-400';
    } else if (product.isOnSale && product.isSuggestedSale) {
      return 'text-purple-600 font-bold';
    } else if (product.isOnSale) {
      return 'text-red-500 font-bold';
    } else if (product.isSuggestedSale) {
      return 'text-blue-500 font-bold';
    }
    return '';
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200">
      <select
        id="product-select"
        value={selectedProductId}
        onChange={(e) => onProductSelect(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg text-base mb-3"
      >
        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
            disabled={product.stock === 0}
            className={getOptionClassName(product)}
          >
            {getProductOptionText(product)}
          </option>
        ))}
      </select>
      <button
        id="add-to-cart"
        onClick={onAddToCart}
        className="w-full py-3 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-all"
      >
        Add to Cart
      </button>
      <div
        id="stock-status"
        className="text-xs text-red-500 mt-3 whitespace-pre-line"
        style={{ display: stockStatus ? 'block' : 'none' }}
      >
        {stockStatus}
      </div>
    </div>
  );
};