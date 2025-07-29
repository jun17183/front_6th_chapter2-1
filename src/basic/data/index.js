import { PRODUCT_LIST, PRODUCT_DISCOUNT_RATE, DISCOUNT_POLICY, POINTS_POLICY } from './constants.js';

// ===== 전역 변수 =====
const productList = [];
const cartList = [];

// ===== 데이터 초기화 =====
export const initializeData = () => {
  initializeProductData();
}

const initializeProductData = () => {
  productList.push(...PRODUCT_LIST);
}

// ===== 상품 관련 함수들 =====

// 상품 목록 조회
export const getProductList = () => {
  return productList;
}

// 장바구니 목록 조회
export const getCartList = () => {
  return cartList;
}

// 상품 조회
export const getProductById = (productId) => {
  return productList.find(product => product.id === productId);
}

// 상품별 할인율 조회
export const getProductDiscountRate = (productId, quantity) => {
  if (quantity >= DISCOUNT_POLICY.INDIVIDUAL_DISCOUNT_THRESHOLD) {
    return PRODUCT_DISCOUNT_RATE[productId] || 0;
  }
  return 0;
}

// 전체 재고 계산
export const calculateTotalStock = () => {
  return productList.reduce((acc, product) => acc + product.stock, 0);
}

// 재고 부족 상품 조회 (5개 미만)
export const getLowStockItems = () => {
  return productList.filter(product => product.stock < 5 && product.stock > 0);
}

// 상품 재고 차감
export const updateProductStock = (productId, quantity) => {
  const product = getProductById(productId);
  if (product) {
    console.log(`[재고 업데이트] ${product.name}: ${product.stock}개 -> ${product.stock - quantity}개 (${quantity > 0 ? '차감' : '복원'})`);
    product.stock -= quantity;
  }
}

// 상품 재고 복원
export const restoreProductStock = (productId, quantity) => {
  const product = getProductById(productId);
  if (product) {
    product.stock += quantity;
  }
}

// 상품 할인 상태 업데이트
export const updateProductSaleStatus = (productId, isOnSale, isSuggestedSale) => {
  const product = getProductById(productId);
  if (product) {
    product.isOnSale = isOnSale;
    product.isSuggestedSale = isSuggestedSale;
  }
}

// 상품 가격 초기화
export const resetProductPrices = () => {
  productList.forEach(product => {
    product.price = product.originalPrice;
    product.isOnSale = false;
    product.isSuggestedSale = false;
  });
}

// ===== 장바구니 관련 함수들 =====

// 장바구니 추가
export const addToCart = (product) => {
  if (!product || !product.id) {
    return;
  }
  
  const existingItem = cartList.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = { 
      ...product, 
      quantity: 1 
    };
    cartList.push(newItem);
  }
}

// 장바구니 삭제
export const removeFromCart = (product) => {
  const cartItemIndex = cartList.findIndex(item => item.id === product.id);
  if (cartItemIndex === -1) return;

  if (cartList[cartItemIndex].quantity > 1) {
    cartList[cartItemIndex].quantity -= 1;
  } else {
    cartList.splice(cartItemIndex, 1);
  }
}

// 장바구니 총 가격 계산 (DOM 기반)
export const calculateTotalPrice = () => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) {
    return 0;
  }

  let totalAmount = 0;
  let totalItemCount = 0;

  // 1단계: 전체 아이템 수량 계산
  for (let i = 0; i < cartItems.children.length; i++) {
    const cartItem = cartItems.children[i];
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent) || 0;
    totalItemCount += quantity;
  }

  // 2단계: 대량구매 할인 여부 결정 (30개 이상)
  if (totalItemCount >= 30) {
    // 대량구매 할인: 전체 25% 할인 (개별 할인 무시)
    let subtotal = 0;
    for (let i = 0; i < cartItems.children.length; i++) {
      const cartItem = cartItems.children[i];
      const productId = cartItem.id;
      const product = getProductById(productId);
      const quantityElement = cartItem.querySelector('.quantity-number');
      const quantity = parseInt(quantityElement.textContent) || 0;
      
      if (product && quantity > 0) {
        const itemSubtotal = product.originalPrice * quantity;
        subtotal += itemSubtotal;
      }
    }
    totalAmount = subtotal * 0.75; // 25% 할인
  } else {
    // 개별 상품 할인 적용
    for (let i = 0; i < cartItems.children.length; i++) {
      const cartItem = cartItems.children[i];
      const productId = cartItem.id;
      const product = getProductById(productId);
      const quantityElement = cartItem.querySelector('.quantity-number');
      const quantity = parseInt(quantityElement.textContent) || 0;
      
      if (product && quantity > 0) {
        let itemPrice = product.originalPrice;
        
        // 10개 이상 구매 시 개별 할인 적용
        if (quantity >= 10) {
          if (productId === 'p1') {
            itemPrice = product.originalPrice * 0.9;
          } else if (productId === 'p2') {
            itemPrice = product.originalPrice * 0.85;
          } else if (productId === 'p3') {
            itemPrice = product.originalPrice * 0.8;
          } else if (productId === 'p4') {
            itemPrice = product.originalPrice * 0.95;
          } else if (productId === 'p5') {
            itemPrice = product.originalPrice * 0.75;
          }
        }
        
        const itemTotal = itemPrice * quantity;
        totalAmount += itemTotal;
      }
    }
  }

  // 3단계: 화요일 할인 (10% 추가 할인)
  if (isTuesday() && totalAmount > 0) {
    totalAmount = totalAmount * 0.9;
  }

  return Math.round(totalAmount);
};

// 장바구니 총 수량 계산 (DOM 기반)
export const calculateTotalItemCount = () => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) {
    return 0;
  }

  let totalItemCount = 0;
  
  for (let i = 0; i < cartItems.children.length; i++) {
    const cartItem = cartItems.children[i];
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent) || 0;
    totalItemCount += quantity;
  }
  
  return totalItemCount;
}

// 장바구니 수량 변경
export const updateCartItemQuantity = (productId, quantity) => {
  const cartItem = cartList.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity = quantity;
  }
}

// 장바구니 수량 조회
export const getCartItemQuantity = (productId) => {
  const cartItem = cartList.find(item => item.id === productId);
  return cartItem ? cartItem.quantity : 0;
}

// 장바구니 초기화
export const clearCart = () => {
  cartList.length = 0;
}

// ===== 할인 관련 함수들 =====

// 할인 적용
export const applyDiscount = (productId) => {
  return product.price * (1 - getProductDiscountRate(productId) / 100);
}

// 장바구니 총 할인 계산
export const calculateTotalDiscount = () => {
  return cartList.reduce((acc, product) => acc + product.price * product.quantity * getProductDiscountRate(product.id), 0);
}

// 개별 상품 할인 계산 (10개 이상 구매 시)
export const calculateIndividualDiscounts = () => {
  const itemDiscounts = [];
  
  cartList.forEach(product => {
    if (product.quantity >= DISCOUNT_POLICY.INDIVIDUAL_DISCOUNT_THRESHOLD) {
      const discountRate = getProductDiscountRate(product.id);
      if (discountRate > 0) {
        itemDiscounts.push({
          name: product.name, 
          discount: discountRate * 100
        });
      }
    }
  });
  
  return itemDiscounts;
}

// 대량구매 할인 계산 (30개 이상)
export const calculateBulkPurchaseDiscount = (totalItemCount) => {
  if (totalItemCount >= DISCOUNT_POLICY.BULK_PURCHASE_THRESHOLD) {
    return DISCOUNT_POLICY.BULK_PURCHASE_RATE;
  }
  return 0;
}

// 화요일 여부 확인
export const isTuesday = () => {
  const today = new Date();
  return today.getDay() === 2;
}

// 화요일 할인 계산
export const calculateTuesdayDiscount = (totalAmount) => {
  if (isTuesday() && totalAmount > 0) {
    return DISCOUNT_POLICY.TUESDAY_DISCOUNT_RATE;
  }
  return 0;
}

// 번개세일 이벤트 시작
export const startLightningSale = () => {
  const availableProducts = productList.filter(product => 
    product.stock > 0 && !product.isOnSale
  );
  
  if (availableProducts.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableProducts.length);
  const luckyProduct = availableProducts[randomIndex];
  
  // 원본과 동일하게 현재 가격 기준으로 20% 할인 적용
  luckyProduct.price = Math.round(luckyProduct.price * (1 - DISCOUNT_POLICY.LIGHTNING_SALE_RATE));
  luckyProduct.isOnSale = true;
  
  return luckyProduct;
}

// 추천할인 이벤트 시작
export const startSuggestedSale = (lastSelectedProductId) => {
  if (cartList.length === 0 || !lastSelectedProductId) return null;
  
  const suggestedProduct = productList.find(product => 
    product.id !== lastSelectedProductId && 
    product.stock > 0 && 
    !product.isSuggestedSale
  );
  
  if (suggestedProduct) {
    // 원본과 동일하게 현재 가격 기준으로 5% 할인 적용
    suggestedProduct.price = Math.round(suggestedProduct.price * (1 - DISCOUNT_POLICY.SUGGESTED_SALE_RATE));
    suggestedProduct.isSuggestedSale = true;
  }
  
  return suggestedProduct;
}

// ===== 포인트 관련 함수들 =====

// 기본 포인트 계산 (구매액의 0.1%)
export const calculateBasePoints = (totalAmount) => {
  return Math.floor(totalAmount * POINTS_POLICY.BASE_RATE);
}

// 보너스 포인트 계산
export const calculateBonusPoints = () => {
  const cartItems = document.getElementById('cart-items').children;
  let totalItemCount = 0;
  const productIds = [];
  
  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productId = cartItem.id;
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 0) {
      totalItemCount += quantity;
      productIds.push(productId);
    }
  }

  let bonusPoints = 0;

  // 키보드+마우스 세트 보너스
  const hasKeyboard = productIds.includes('p1');
  const hasMouse = productIds.includes('p2');
  if (hasKeyboard && hasMouse) {
    bonusPoints += POINTS_POLICY.KEYBOARD_MOUSE_BONUS;
  }

  // 풀세트 보너스 (키보드+마우스+모니터암)
  const hasMonitorArm = productIds.includes('p3');
  if (hasKeyboard && hasMouse && hasMonitorArm) {
    bonusPoints += POINTS_POLICY.FULL_SET_BONUS;
  }

  // 수량별 보너스
  if (totalItemCount >= 30) {
    bonusPoints += POINTS_POLICY.BULK_PURCHASE_BONUS[30];
  } else if (totalItemCount >= 20) {
    bonusPoints += POINTS_POLICY.BULK_PURCHASE_BONUS[20];
  } else if (totalItemCount >= 10) {
    bonusPoints += POINTS_POLICY.BULK_PURCHASE_BONUS[10];
  }

  return bonusPoints;
}

// 보너스 포인트 텍스트 생성
export const getBonusPointsText = () => {
  const cartItems = document.getElementById('cart-items').children;
  let totalItemCount = 0;
  const productIds = [];
  const bonusDetails = [];
  
  // DOM 요소를 직접 순회하여 계산
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productId = cartItem.id;
    const quantityElement = cartItem.querySelector('.quantity-number');
    const quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 0) {
      totalItemCount += quantity;
      productIds.push(productId);
    }
  }

  // 키보드+마우스 세트 보너스
  const hasKeyboard = productIds.includes('p1');
  const hasMouse = productIds.includes('p2');
  if (hasKeyboard && hasMouse) {
    bonusDetails.push('키보드+마우스 세트');
  }

  // 풀세트 보너스 (키보드+마우스+모니터암)
  const hasMonitorArm = productIds.includes('p3');
  if (hasKeyboard && hasMouse && hasMonitorArm) {
    bonusDetails.push('풀세트 구매');
  }

  // 수량별 보너스
  if (totalItemCount >= 30) {
    bonusDetails.push('대량구매(30개+)');
  } else if (totalItemCount >= 20) {
    bonusDetails.push('대량구매(20개+)');
  } else if (totalItemCount >= 10) {
    bonusDetails.push('대량구매(10개+)');
  }

  return bonusDetails.length > 0 ? bonusDetails.join(', ') : '없음';
};