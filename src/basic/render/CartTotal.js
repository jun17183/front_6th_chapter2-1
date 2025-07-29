import { 
  calculateTotalPrice, 
  calculateIndividualDiscounts, 
  calculateBulkPurchaseDiscount, 
  isTuesday, 
  calculateTuesdayDiscount, 
  calculateBonusPoints 
} from '../data/index.js';
import { DISCOUNT_POLICY } from '../data/constants.js';

export const CartTotal = /*html*/ `
  <h2 class="text-xs font-medium mb-5 tracking-extra-wide uppercase">Order Summary</h2>
  <div class="flex-1 flex flex-col">
    <div id="summary-details" class="space-y-3"></div>
    <div class="mt-auto">
      <div id="discount-info" class="mb-4"></div>
      <div id="cart-total" class="pt-5 border-t border-white/10">
        <div class="flex justify-between items-baseline">
          <span class="text-sm uppercase tracking-wider">Total</span>
          <div id="total-price" class="text-2xl tracking-tight">₩0</div>
        </div>
        <div id="loyalty-points" class="text-xs text-blue-400 mt-2 text-right">적립 포인트: 0p</div>
      </div>
        <div id="tuesday-special" class="mt-4 p-3 bg-white/10 rounded-lg hidden">
        <div class="flex items-center gap-2">
          <span class="text-2xs">🎉</span>
          <span class="text-xs uppercase tracking-wide">Tuesday Special 10% Applied</span>
        </div>
      </div>
    </div>
  </div>
  <button class="w-full py-4 bg-white text-black text-sm font-normal uppercase tracking-super-wide cursor-pointer mt-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30">
    Proceed to Checkout
  </button>
  <p class="mt-4 text-2xs text-white/60 text-center leading-relaxed">
    Free shipping on all orders.<br>
    <span id="points-notice">Earn loyalty points with purchase.</span>
  </p>
`;

// 장바구니 요약 정보 업데이트 - 상품별 요약, 할인 정보, 배송 정보 표시
export const updateCartSummary = () => {
  const cartItems = document.getElementById('cart-items').children;
  let subtotal = 0;
  const itemDiscounts = [];
  let totalItemCount = 0;
  const isTuesdayToday = isTuesday();
  
  // 요약 세부사항 업데이트
  const summaryDetailsElement = document.getElementById('summary-details');
  if (!summaryDetailsElement) return;
  
  summaryDetailsElement.innerHTML = '';

  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productId = cartItem.id;
    const product = getProductById(productId);
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    
    if (product && quantity > 0) {
      const itemTotal = product.price * quantity;
      totalItemCount += quantity;
      subtotal += itemTotal;
      
      // 개별 상품 할인 계산 (10개 이상 구매 시)
      if (quantity >= DISCOUNT_POLICY.INDIVIDUAL_DISCOUNT_THRESHOLD) {
        const discountRate = getProductDiscountRate(productId);
        if (discountRate > 0) {
          itemDiscounts.push({
            name: product.name, 
            discount: discountRate * 100
          });
        }
      }
    }
  }

  if (subtotal > 0) {
    // 각 아이템별 요약 표시
    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i];
      const productId = cartItem.id;
      const product = getProductById(productId);
      const quantityElement = cartItem.querySelector('.quantity-number');
      const quantity = parseInt(quantityElement.textContent);
      
      if (product && quantity > 0) {
        const itemTotal = product.price * quantity;
        summaryDetailsElement.innerHTML += /*html*/ `
          <div class="flex justify-between text-xs tracking-wide text-gray-400">
            <span>${product.name} x ${quantity}</span>
            <span>₩${itemTotal.toLocaleString()}</span>
          </div>
        `;
      }
    }

    // 소계 표시
    summaryDetailsElement.innerHTML += /*html*/ `
      <div class="border-t border-white/10 my-3"></div>
      <div class="flex justify-between text-sm tracking-wide">
        <span>Subtotal</span>
        <span>₩${subtotal.toLocaleString()}</span>
      </div>
    `;

    // 할인 정보 표시 - 대량구매 할인 (30개 이상 시 25% 할인)
    if (totalItemCount >= DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD) {
      summaryDetailsElement.innerHTML += /*html*/ `
        <div class="flex justify-between text-sm tracking-wide text-green-400">
          <span class="text-xs">🎉 대량구매 할인 (${DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD}개 이상)</span>
          <span class="text-xs">-${(DISCOUNT_POLICY.BULK_PURCHASE_RATE * 100)}%</span>
        </div>
      `;
    } else if (itemDiscounts.length > 0) {
      itemDiscounts.forEach(item => {
        summaryDetailsElement.innerHTML += /*html*/ `
          <div class="flex justify-between text-sm tracking-wide text-green-400">
            <span class="text-xs">${item.name} (10개↑)</span>
            <span class="text-xs">-${item.discount}%</span>
          </div>
        `;
      });
    }

    // 화요일 할인 표시 - 화요일 추가 10% 할인
    if (isTuesdayToday && subtotal > 0) {
      summaryDetailsElement.innerHTML += /*html*/ `
        <div class="flex justify-between text-sm tracking-wide text-purple-400">
          <span class="text-xs">🌟 화요일 추가 할인</span>
          <span class="text-xs">-${(DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE * 100)}%</span>
        </div>
      `;
    }

    // 배송 정보 표시
    summaryDetailsElement.innerHTML += /*html*/ `
      <div class="flex justify-between text-sm tracking-wide text-blue-400">
        <span>Shipping</span>
        <span>Free</span>
      </div>
    `;
  }
};

// 총 가격 업데이트
export const updateTotalPrice = () => {
  const cartItems = document.getElementById('cart-items').children;
  let subtotal = 0;
  let totalItemCount = 0;
  
  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productId = cartItem.id;
    const product = getProductById(productId);
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    
    if (product && quantity > 0) {
      const itemTotal = product.price * quantity;
      totalItemCount += quantity;
      subtotal += itemTotal;
    }
  }

  let totalAmount = subtotal;
  
  // 대량구매 할인 적용 (30개 이상)
  if (totalItemCount >= DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD) {
    totalAmount = subtotal * (1 - DISCOUNT_POLICY.BULK_PURCHASE_RATE);
  }
  
  // 화요일 할인 적용
  if (isTuesday() && totalAmount > 0) {
    totalAmount = totalAmount * (1 - DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE);
  }

  const totalPriceElement = document.getElementById('total-price');
  if (totalPriceElement) {
    totalPriceElement.textContent = `₩${totalAmount.toLocaleString()}`;
  }
};

// 할인 정보 업데이트
export const updateDiscountInfo = () => {
  const cartItems = document.getElementById('cart-items').children;
  let subtotal = 0;
  let totalItemCount = 0;
  let totalDiscountAmount = 0;
  
  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productId = cartItem.id;
    const product = getProductById(productId);
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    
    if (product && quantity > 0) {
      const itemTotal = product.price * quantity;
      totalItemCount += quantity;
      subtotal += itemTotal;
      
      // 개별 상품 할인 계산
      if (quantity >= DISCOUNT_POLICY.INDIVIDUAL_DISCOUNT_THRESHOLD) {
        const discountRate = getProductDiscountRate(productId);
        if (discountRate > 0) {
          totalDiscountAmount += itemTotal * discountRate;
        }
      }
    }
  }

  let totalAmount = subtotal;
  let totalDiscountRate = 0;
  
  // 대량구매 할인 계산
  if (totalItemCount >= DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD) {
    totalAmount = subtotal * (1 - DISCOUNT_POLICY.BULK_PURCHASE_RATE);
    totalDiscountAmount = subtotal * DISCOUNT_POLICY.BULK_PURCHASE_RATE;
  }
  
  // 화요일 할인 계산
  if (isTuesday() && totalAmount > 0) {
    const tuesdayDiscount = totalAmount * DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE;
    totalAmount = totalAmount * (1 - DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE);
    totalDiscountAmount += tuesdayDiscount;
  }

  const discountInfoElement = document.getElementById('discount-info');
  if (!discountInfoElement) return;

  if (subtotal > 0) {
    totalDiscountRate = (totalDiscountAmount / subtotal) * 100;
    
    discountInfoElement.innerHTML = /*html*/ `
      <div class="flex justify-between text-sm tracking-wide text-green-400">
        <span>Total Discount</span>
        <span>-${totalDiscountRate.toFixed(1)}%</span>
      </div>
      <div class="flex justify-between text-sm tracking-wide text-green-400">
        <span>You Save</span>
        <span>₩${totalDiscountAmount.toLocaleString()}</span>
      </div>
    `;
  } else {
    discountInfoElement.innerHTML = '';
  }
};

// 포인트 적립 정보 업데이트
export const updateLoyaltyPoints = () => {
  const cartItems = document.getElementById('cart-items').children;
  let subtotal = 0;
  let totalItemCount = 0;
  
  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productId = cartItem.id;
    const product = getProductById(productId);
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    
    if (product && quantity > 0) {
      const itemTotal = product.price * quantity;
      totalItemCount += quantity;
      subtotal += itemTotal;
    }
  }

  let totalAmount = subtotal;
  
  // 대량구매 할인 적용 (30개 이상)
  if (totalItemCount >= DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD) {
    totalAmount = subtotal * (1 - DISCOUNT_POLICY.BULK_PURCHASE_RATE);
  }
  
  // 화요일 할인 적용
  if (isTuesday() && totalAmount > 0) {
    totalAmount = totalAmount * (1 - DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE);
  }

  const loyaltyPointsElement = document.getElementById('loyalty-points');
  if (!loyaltyPointsElement) return;

  if (totalAmount > 0) {
    const basePoints = Math.floor(totalAmount * POINTS_POLICY.BASE_RATE);
    let finalPoints = basePoints;
    
    // 화요일 2배 보너스
    if (isTuesday()) {
      finalPoints = basePoints * POINTS_POLICY.TUESDAY_MULTIPLIER;
    }
    
    const bonusPoints = calculateBonusPoints();
    finalPoints += bonusPoints;
    
    loyaltyPointsElement.textContent = `적립 포인트: ${finalPoints}p`;
  } else {
    loyaltyPointsElement.textContent = '적립 포인트: 0p';
  }
};

// 화요일 특별 할인 표시 업데이트 - 화요일일 때 특별 할인 UI 표시/숨김
export const updateTuesdaySpecial = () => {
  const isTuesdayToday = isTuesday();
  const subtotal = calculateTotalPrice();
  const tuesdaySpecialElement = document.getElementById('tuesday-special');
  
  if (!tuesdaySpecialElement) return;
  
  if (isTuesdayToday && subtotal > 0) {
    tuesdaySpecialElement.classList.remove('hidden');
  } else {
    tuesdaySpecialElement.classList.add('hidden');
  }
};