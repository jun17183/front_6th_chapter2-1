import { PRODUCT_LIST, PRODUCT_DISCOUNT_RATE, DISCOUNT_POLICY, POINTS_POLICY } from './constants.js';

// 글로벌 상태 변수들
let productList = [...PRODUCT_LIST]; // 상품 목록 (재고 변화 가능)
let cartList = []; // 장바구니 목록
let lastSelectedProductId = null; // 마지막 선택된 상품 ID

// 데이터 초기화
export const initializeData = () => {
  // 상품 목록 초기화 (깊은 복사)
  productList = PRODUCT_LIST.map(product => ({ ...product }));
  cartList = [];
  lastSelectedProductId = null;
  console.log('Data initialized');
};

// 상품 관련 함수들
export const getProductList = () => productList;

export const getProductById = (productId) => {
  return productList.find(product => product.id === productId);
};

export const updateProductStock = (productId, changeAmount) => {
  const product = getProductById(productId);
  if (product) {
    product.stock -= changeAmount; // changeAmount가 양수면 재고 감소, 음수면 재고 증가
    if (product.stock < 0) product.stock = 0; // 재고는 0 미만이 될 수 없음
  }
};

export const restoreProductStock = (productId, amount) => {
  const product = getProductById(productId);
  if (product) {
    product.stock += amount;
  }
};

// 장바구니 관련 함수들
export const addToCart = (product) => {
  cartList.push({ ...product });
};

export const removeFromCart = (product) => {
  const index = cartList.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartList.splice(index, 1);
  }
};

export const getCartList = () => cartList;

export const clearCart = () => {
  cartList = [];
};

// 계산 관련 함수들
export const calculateTotalItemCount = () => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return 0;
  
  let totalCount = 0;
  for (let i = 0; i < cartItems.children.length; i++) {
    const quantityElement = cartItems.children[i].querySelector('.quantity-number');
    if (quantityElement) {
      totalCount += parseInt(quantityElement.textContent) || 0;
    }
  }

  return totalCount;
};

export const calculateTotalStock = () => {
  return productList.reduce((total, product) => total + product.stock, 0);
};

export const getLowStockItems = () => {
  return productList.filter(product => product.stock > 0 && product.stock < 5);
};

// 할인 관련 함수들
export const getProductDiscountRate = (productId, quantity) => {
  if (quantity < DISCOUNT_POLICY.INDIVIDUAL_DISCOUNT_THRESHOLD) return 0;
  return PRODUCT_DISCOUNT_RATE[productId] || 0;
};

// 날짜 관련 함수들
export const isTuesday = () => {
  const today = new Date();
  return today.getDay() === 2; // 0=일요일, 1=월요일, 2=화요일, ...
};

// 가격 계산 함수들
export const calculateTotalPrice = () => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) return 0;

  let totalItemCount = 0;
  let subtotal = 0;
  let totalAmount = 0;

  // DOM 요소를 직접 순회하여 계산
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
      
      totalAmount += itemTotal * (1 - discount);
    }
  }

  // 대량구매 할인 (30개 이상 시 개별 할인 무시하고 전체 25% 할인)
  if (totalItemCount >= 30) {
    totalAmount = subtotal * 0.75; // 25% 할인
  }

  // 화요일 할인 (10% 추가 할인)
  if (isTuesday() && totalAmount > 0) {
    totalAmount = totalAmount * 0.9; // 10% 추가 할인
  }

  return Math.round(totalAmount);
};

// 포인트 계산 함수들
export const calculateBasePoints = (totalPrice) => {
  return Math.floor(totalPrice * POINTS_POLICY.BASE_RATE);
};

export const calculateBonusPoints = () => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) return 0;

  let bonusPoints = 0;
  let hasKeyboard = false;
  let hasMouse = false;
  let hasMonitorArm = false;
  let totalItemCount = calculateTotalItemCount();

  // 세트 구매 보너스 확인
  for (let i = 0; i < cartItems.children.length; i++) {
    const cartItem = cartItems.children[i];
    const productId = cartItem.id;
    
    if (productId === 'p1') hasKeyboard = true;
    if (productId === 'p2') hasMouse = true;
    if (productId === 'p3') hasMonitorArm = true;
  }

  // 키보드+마우스 세트 보너스
  if (hasKeyboard && hasMouse) {
    bonusPoints += POINTS_POLICY.KEYBOARD_MOUSE_BONUS;
  }

  // 풀세트 보너스
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
};

export const getBonusPointsText = () => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems || cartItems.children.length === 0) return '없음';

  let bonusTexts = [];
  let hasKeyboard = false;
  let hasMouse = false;
  let hasMonitorArm = false;
  let totalItemCount = calculateTotalItemCount();

  // 세트 구매 보너스 확인
  for (let i = 0; i < cartItems.children.length; i++) {
    const cartItem = cartItems.children[i];
    const productId = cartItem.id;
    
    if (productId === 'p1') hasKeyboard = true;
    if (productId === 'p2') hasMouse = true;
    if (productId === 'p3') hasMonitorArm = true;
  }

  // 키보드+마우스 세트 보너스
  if (hasKeyboard && hasMouse) {
    bonusTexts.push('키보드+마우스 세트 +50p');
  }

  // 풀세트 보너스
  if (hasKeyboard && hasMouse && hasMonitorArm) {
    bonusTexts.push('풀세트 구매 +100p');
  }

  // 수량별 보너스
  if (totalItemCount >= 30) {
    bonusTexts.push('대량구매(30개+) +100p');
  } else if (totalItemCount >= 20) {
    bonusTexts.push('대량구매(20개+) +50p');
  } else if (totalItemCount >= 10) {
    bonusTexts.push('대량구매(10개+) +20p');
  }

  return bonusTexts.length > 0 ? bonusTexts.join(', ') : '없음';
};

// 자동 이벤트 관련 함수들
export const getLastSelectedProductId = () => lastSelectedProductId;
export const setLastSelectedProductId = (productId) => {
  lastSelectedProductId = productId;
};

// 번개세일 시작
export const startLightningSale = () => {
  const availableProducts = productList.filter(product => 
    product.stock > 0 && !product.isOnSale && !product.isSuggestedSale
  );
  
  if (availableProducts.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableProducts.length);
  const selectedProduct = availableProducts[randomIndex];
  
  // 20% 할인 적용
  selectedProduct.price = Math.round(selectedProduct.originalPrice * 0.8);
  selectedProduct.isOnSale = true;
  
  return selectedProduct;
};

// 추천할인 시작
export const startSuggestedSale = (excludeProductId) => {
  const availableProducts = productList.filter(product => 
    product.stock > 0 && 
    product.id !== excludeProductId && 
    !product.isOnSale && 
    !product.isSuggestedSale
  );
  
  if (availableProducts.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableProducts.length);
  const selectedProduct = availableProducts[randomIndex];
  
  // 5% 할인 적용
  selectedProduct.price = Math.round(selectedProduct.price * 0.95);
  selectedProduct.isSuggestedSale = true;
  
  return selectedProduct;
};

// 상품 할인 상태 업데이트
export const updateProductSaleStatus = (productId, isOnSale, isSuggestedSale) => {
  const product = getProductById(productId);
  if (product) {
    product.isOnSale = isOnSale;
    product.isSuggestedSale = isSuggestedSale;
    
    // 할인이 해제되면 원래 가격으로 복원
    if (!isOnSale && !isSuggestedSale) {
      product.price = product.originalPrice;
    }
  }
};

// 모든 상품 가격 초기화
export const resetProductPrices = () => {
  productList.forEach(product => {
    product.price = product.originalPrice;
    product.isOnSale = false;
    product.isSuggestedSale = false;
  });
};