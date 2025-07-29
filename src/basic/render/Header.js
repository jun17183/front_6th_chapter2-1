import { calculateTotalItemCount } from '../data/index.js';

export const Header = /*html*/ `
  <div id="header" class="mb-8">
    <h1 class="text-xs font-medium tracking-extra-wide uppercase mb-2">🛒 Hanghae Online Store</h1>
    <div class="text-5xl tracking-tight leading-none">Shopping Cart</div>
    <p id="item-count" class="text-sm text-gray-500 font-normal mt-3">🛍️ 0 items in cart</p>
  </div>
`;

// 헤더의 장바구니 아이템 수 업데이트
export const updateHeaderItemCount = () => {
  const cartItems = document.getElementById('cart-items').children;
  let totalItemCount = 0;
  
  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    totalItemCount += quantity || 0;
  }

  const itemCountElement = document.getElementById('item-count');
  if (itemCountElement) {
    itemCountElement.textContent = `🛍️ ${totalItemCount} items in cart`;
  }
};