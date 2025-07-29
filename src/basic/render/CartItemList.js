import { getProductById } from "../data/index.js";

export const CartItemList = /*html*/ `
  <div id="cart-items"></div>
`;

// 새로운 장바구니 아이템 생성 (main.basic copy.js의 createCartItem 로직 기반)
export const renderCartItemList = (product) => {
  const cartDisplayElement = document.getElementById('cart-items');
  if (!cartDisplayElement || !product) return;

  const newCartItem = document.createElement('div');
  newCartItem.id = product.id;
  newCartItem.className = 'grid grid-cols-[80px_1fr_auto] gap-5 py-5 border-b border-gray-100 first:pt-0 last:border-b-0 last:pb-0';
  
  let priceDisplay = '';
  let namePrefix = '';
  
  if (product.isOnSale || product.isSuggestedSale) {
    const colorClass = product.isOnSale && product.isSuggestedSale ? 'text-purple-600' : 
                     product.isOnSale ? 'text-red-500' : 'text-blue-500';
    priceDisplay = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="' + colorClass + '">₩' + product.price.toLocaleString() + '</span>';
    namePrefix = product.isOnSale && product.isSuggestedSale ? '⚡💝' : 
                 product.isOnSale ? '⚡' : '💝';
  } else {
    priceDisplay = '₩' + product.price.toLocaleString();
  }

  newCartItem.innerHTML = /*html*/ `
    <div class="w-20 h-20 bg-gradient-black relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 w-[60%] h-[60%] bg-white/10 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
    </div>
    <div>
      <h3 class="text-base font-normal mb-1 tracking-tight">${namePrefix}${product.name}</h3>
      <p class="text-xs text-gray-500 mb-0.5 tracking-wide">PRODUCT</p>
      <p class="text-xs text-black mb-3">${priceDisplay}</p>
      <div class="flex items-center gap-4">
        <button class="quantity-change w-6 h-6 border border-black bg-white text-sm flex items-center justify-center transition-all hover:bg-black hover:text-white" data-product-id="${product.id}" data-change="-1">−</button>
        <span class="quantity-number text-sm font-normal min-w-[20px] text-center tabular-nums">1</span>
        <button class="quantity-change w-6 h-6 border border-black bg-white text-sm flex items-center justify-center transition-all hover:bg-black hover:text-white" data-product-id="${product.id}" data-change="1">+</button>
      </div>
    </div>
    <div class="text-right">
      <div class="text-lg mb-2 tracking-tight tabular-nums">${priceDisplay}</div>
      <a class="remove-item text-2xs text-gray-500 uppercase tracking-wider cursor-pointer transition-colors border-b border-transparent hover:text-black hover:border-black" data-product-id="${product.id}">Remove</a>
    </div>
  `;

  cartDisplayElement.appendChild(newCartItem);
};

// 장바구니 내 상품들의 가격 업데이트 (할인 적용 시)
export const updateCartItemPrices = () => {
  const cartItems = document.getElementById('cart-items').children;

  for (let i = 0; i < cartItems.length; i++) {
    const itemId = cartItems[i].id;
    const product = getProductById(itemId);

    if (product) {
      const priceDiv = cartItems[i].querySelector('.text-lg');
      const nameDiv = cartItems[i].querySelector('h3');
      const priceTextDiv = cartItems[i].querySelector('.text-xs.text-black');

      // 할인 상태에 따른 가격 표시
      if (product.isOnSale && product.isSuggestedSale) {
        priceDiv.innerHTML = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="text-purple-600">₩' + product.price.toLocaleString() + '</span>';
        nameDiv.textContent = '⚡💝' + product.name;
        if (priceTextDiv) {
          priceTextDiv.innerHTML = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="text-purple-600">₩' + product.price.toLocaleString() + '</span>';
        }
      } else if (product.isOnSale) {
        priceDiv.innerHTML = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="text-red-500">₩' + product.price.toLocaleString() + '</span>';
        nameDiv.textContent = '⚡' + product.name;
        if (priceTextDiv) {
          priceTextDiv.innerHTML = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="text-red-500">₩' + product.price.toLocaleString() + '</span>';
        }
      } else if (product.isSuggestedSale) {
        priceDiv.innerHTML = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="text-blue-500">₩' + product.price.toLocaleString() + '</span>';
        nameDiv.textContent = '💝' + product.name;
        if (priceTextDiv) {
          priceTextDiv.innerHTML = '<span class="line-through text-gray-400">₩' + product.originalPrice.toLocaleString() + '</span> <span class="text-blue-500">₩' + product.price.toLocaleString() + '</span>';
        }
      } else {
        priceDiv.textContent = '₩' + product.price.toLocaleString();
        nameDiv.textContent = product.name;
        if (priceTextDiv) {
          priceTextDiv.textContent = '₩' + product.price.toLocaleString();
        }
      }
    }
  }
};