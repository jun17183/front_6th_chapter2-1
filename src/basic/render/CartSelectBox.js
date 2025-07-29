import { 
  getProductList, 
  getLowStockItems, 
  calculateTotalStock 
} from "../data/index.js";

export const CartSelectBox = /*html*/ `
  <div class="mb-8">
    <h2 class="text-xs font-medium mb-5 tracking-extra-wide uppercase">Product Selection</h2>
    <div class="space-y-4">
      <select id="product-select" class="w-full p-3 bg-white/10 border border-white/20 text-sm tracking-wide focus:outline-none focus:border-white/40 transition-all">
        <option value="">Select a product...</option>
      </select>
      <div id="stock-info" class="text-xs text-yellow-400 hidden"></div>
      <button id="add-to-cart" class="w-full py-3 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-all">
        Add to Cart
      </button>
    </div>
  </div>
`;

// 상품 선택 옵션 업데이트
export const updateCartSelectOptions = () => {
  const productList = getProductList();
  const productSelect = document.getElementById('product-select');
  const totalStock = calculateTotalStock();
  
  if (!productSelect) return;
  
  productSelect.innerHTML = '';

  // 각 상품에 대한 옵션 생성
  productList.forEach(product => {
    const optionElement = document.createElement('option');
    optionElement.value = product.id;
    let discountText = '';

    // 할인 상태 표시
    if (product.isOnSale) discountText += ' ⚡SALE';
    if (product.isSuggestedSale) discountText += ' 💝추천';

    // 품절 상품 처리
    if (product.stock === 0) {
      optionElement.textContent = `${product.name} - ${product.price}원 (품절)${discountText}`;
      optionElement.disabled = true;
      optionElement.className = 'text-gray-400';
    } else {
      // 할인 상품 표시
      if (product.isOnSale && product.isSuggestedSale) {
        optionElement.textContent = `⚡💝${product.name} - ${product.originalPrice}원 → ${product.price}원 (25% SUPER SALE!)`;
        optionElement.className = 'text-purple-600 font-bold';
      } else if (product.isOnSale) {
        optionElement.textContent = `⚡${product.name} - ${product.originalPrice}원 → ${product.price}원 (20% SALE!)`;
        optionElement.className = 'text-red-500 font-bold';
      } else if (product.isSuggestedSale) {
        optionElement.textContent = `💝${product.name} - ${product.originalPrice}원 → ${product.price}원 (5% 추천할인!)`;
        optionElement.className = 'text-blue-500 font-bold';
      } else {
        optionElement.textContent = `${product.name} - ${product.price}원${discountText}`;
      }
    }
    
    productSelect.appendChild(optionElement);
  });

  // 재고 부족 시 셀렉트 박스 스타일 변경
  if (totalStock < 50) {
    productSelect.style.borderColor = 'orange';
  } else {
    productSelect.style.borderColor = '';
  }
};

// 재고 정보 업데이트
export const updateStockInfo = () => {
  const stockInfoElement = document.getElementById('stock-info');
  if (!stockInfoElement) return;

  const lowStockItems = getLowStockItems();
  
  if (lowStockItems.length > 0) {
    const stockInfoText = lowStockItems.map(item => 
      `${item.name} - ${item.stock}개 남음`
    ).join(', ');
    
    stockInfoElement.textContent = `재고 부족: ${stockInfoText}`;
    stockInfoElement.style.display = 'block';
  } else {
    stockInfoElement.style.display = 'none';
  }
};

