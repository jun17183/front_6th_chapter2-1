import { 
  getProductById, 
  getProductDiscountRate, 
  calculateBonusPoints,
  getBonusPointsText,
  calculateBasePoints,
  isTuesday,
  calculateTotalPrice,
  calculateTotalItemCount
} from '../data/index.js';
import { DISCOUNT_POLICY, POINTS_POLICY } from '../data/constants.js';

export const CartTotal = /*html*/ `
  <h2 class="text-xs font-medium mb-5 tracking-extra-wide uppercase">Order Summary</h2>
  <div class="flex-1 flex flex-col">
    <div id="summary-details" class="space-y-3"></div>
    <div class="mt-auto">
      <div id="discount-info" class="mb-4"></div>
      <div id="tuesday-special" class="mt-4 p-3 bg-white/10 rounded-lg hidden">
        <div class="flex items-center gap-2">
          <span class="text-2xs">🎉</span>
          <span class="text-xs uppercase tracking-wide">Tuesday Special 10% Applied</span>
        </div>
      </div>
      <div id="cart-total" class="pt-5 border-t border-white/10">
        <div class="flex justify-between items-baseline">
          <span class="text-sm uppercase tracking-wider">Total</span>
          <div id="total-price" class="text-2xl tracking-tight">₩0</div>
        </div>
        <div id="loyalty-points" class="mt-2 text-sm text-gray-400" style="display: none;"></div>
      </div>
    </div>
  </div>
`;

// 주문 요약 업데이트
export const updateCartSummary = () => {
  const summaryDetailsElement = document.getElementById('summary-details');
  if (!summaryDetailsElement) return;

  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) {
    summaryDetailsElement.innerHTML = '<p class="text-sm text-gray-400">장바구니가 비어있습니다.</p>';
    return;
  }

  let summaryHTML = '';
  let subtotal = 0;

  for (let i = 0; i < cartItems.children.length; i++) {
    const cartItem = cartItems.children[i];
    const productId = cartItem.id;
    const product = getProductById(productId);
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent) || 0;
    
    if (product && quantity > 0) {
      // originalPrice 기준으로 계산
      const itemTotal = product.originalPrice * quantity;
      subtotal += itemTotal;
      summaryHTML += `
        <div class="flex justify-between text-sm">
          <span>${product.name} x ${quantity}</span>
          <span>₩${itemTotal.toLocaleString()}</span>
        </div>
      `;
    }
  }

  summaryDetailsElement.innerHTML = summaryHTML;
};

// 총 가격 업데이트
export const updateTotalPrice = () => {
  const totalPriceElement = document.getElementById('total-price');
  if (!totalPriceElement) return;

  const totalPrice = calculateTotalPrice();
  totalPriceElement.textContent = `₩${totalPrice.toLocaleString()}`;
};

// 할인 정보 업데이트  
export const updateDiscountInfo = () => {
  const discountInfoElement = document.getElementById('discount-info');
  if (!discountInfoElement) return;

  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) {
    discountInfoElement.innerHTML = '';
    return;
  }

  let totalItemCount = 0;
  let subtotal = 0;
  let totalAmount = 0;
  let discountDetails = [];

  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.children.length; i++) {
    const cartItem = cartItems.children[i];
    const productId = cartItem.id;
    const product = getProductById(productId);
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent) || 0;
    
    if (product && quantity > 0) {
      // originalPrice 기준으로 계산 - 이게 핵심 수정!
      const itemTotal = product.originalPrice * quantity;
      subtotal += itemTotal;
      totalItemCount += quantity;
      
      let discount = 0;
      
      // 10개 이상 구매 시 개별 할인 적용
      if (quantity >= 10) {
        if (productId === 'p1') discount = 0.1;        // 10%
        else if (productId === 'p2') discount = 0.15;  // 15%
        else if (productId === 'p3') discount = 0.2;   // 20%
        else if (productId === 'p4') discount = 0.05;  // 5%
        else if (productId === 'p5') discount = 0.25;  // 25%
      }
      
      if (discount > 0) {
        discountDetails.push(`${product.name}: ${(discount * 100).toFixed(1)}% 할인`);
      }
      

      totalAmount += itemTotal * (1 - discount);
    }
  }

  // 대량구매 할인 (30개 이상 시 개별 할인 무시하고 전체 25% 할인)
  if (totalItemCount >= 30) {
    totalAmount = subtotal * 0.75; // 25% 할인
    discountDetails = ['대량구매: 25.0% 할인'];
  }

  // 화요일 할인 (10% 추가 할인)
  if (isTuesday() && totalAmount > 0) {
    const originalAmount = totalAmount;
    totalAmount = totalAmount * 0.9; // 10% 추가 할인
    const totalDiscountRate = ((subtotal - totalAmount) / subtotal * 100).toFixed(1);
    discountDetails.push(`화요일 할인: 10.0% 추가`);
    discountDetails.push(`총 할인율: ${totalDiscountRate}%`);
  } else if (discountDetails.length > 0) {
    const totalDiscountRate = ((subtotal - totalAmount) / subtotal * 100).toFixed(1);
    discountDetails.push(`총 할인율: ${totalDiscountRate}%`);
  }

  if (discountDetails.length > 0) {
    discountInfoElement.innerHTML = `
      <div class="text-sm text-green-400">
        ${discountDetails.map(detail => `<div>${detail}</div>`).join('')}
      </div>
    `;
  } else {
    discountInfoElement.innerHTML = '';
  }
};

// 포인트 정보 업데이트
export const updateLoyaltyPoints = () => {
  const loyaltyPointsElement = document.getElementById('loyalty-points');
  if (!loyaltyPointsElement) return;

  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) {
    loyaltyPointsElement.style.display = 'none';
    return;
  }

  loyaltyPointsElement.style.display = 'block';

  const totalPrice = calculateTotalPrice();
  const basePoints = calculateBasePoints(totalPrice);
  const bonusPoints = calculateBonusPoints();
  const bonusText = getBonusPointsText();
  
  let totalPoints = basePoints + bonusPoints;
  
  // 화요일에는 기본 포인트 2배
  if (isTuesday()) {
    totalPoints = basePoints * 2 + bonusPoints;
  }

  let pointsDetails = [`기본: ${basePoints}p`];
  
  if (isTuesday()) {
    pointsDetails = [`기본: ${basePoints}p`, '화요일 2배'];
  }
  
  if (bonusText !== '없음') {
    pointsDetails.push(bonusText);
  }

  loyaltyPointsElement.innerHTML = `적립 포인트: ${totalPoints}p${pointsDetails.join(', ')}`;
};

// 화요일 특별 할인 표시
export const updateTuesdaySpecial = () => {
  const isTuesdayToday = isTuesday();
  const totalAmount = calculateTotalPrice();
  const tuesdaySpecialElement = document.getElementById('tuesday-special');
  
  if (!tuesdaySpecialElement) return;
  
  if (isTuesdayToday && totalAmount > 0) {
    tuesdaySpecialElement.classList.remove('hidden');
  } else {
    tuesdaySpecialElement.classList.add('hidden');
  }
};