import { 
  getProductById, 
  updateProductStock, 
  restoreProductStock,
  addToCart,
  removeFromCart
} from "../data/index.js";

import { updateHeaderItemCount } from "../render/Header.js";
import { updateCartSelectOptions, updateStockInfo } from "../render/CartSelectBox.js";
import { 
  updateCartSummary,
  updateTotalPrice,
  updateDiscountInfo,
  updateLoyaltyPoints,
  updateTuesdaySpecial
} from "../render/CartTotal.js";
import { renderCartItemList } from "../render/CartItemList.js";
import { updateLastSelectedProduct } from "./Auto.js";

// 장바구니에 상품 추가
export const handleAddToCart = () => {
  const productSelectElement = document.getElementById('product-select');
  if (!productSelectElement) return;

  const selectedProductId = productSelectElement.value;
  const selectedProduct = getProductById(selectedProductId);

  if (!selectedProductId || !selectedProduct) {
    return;
  }

  if (selectedProduct.stock > 0) {
    const existingCartItem = document.getElementById(selectedProduct.id);
    
    if (existingCartItem) {
      // 이미 장바구니에 있는 상품의 수량 증가
      const quantityElement = existingCartItem.querySelector('.quantity-number');
      const newQuantity = parseInt(quantityElement.textContent) + 1;
      
      if (newQuantity <= selectedProduct.stock + parseInt(quantityElement.textContent)) {
        quantityElement.textContent = newQuantity;
        updateProductStock(selectedProduct.id, 1);
        addToCart(selectedProduct); // cartList 배열 업데이트
      } else {
        alert('재고가 부족합니다.');
        return;
      }
    } else {
      // 새로운 상품을 장바구니에 추가
      renderCartItemList(selectedProduct);
      updateProductStock(selectedProduct.id, 1);
      addToCart(selectedProduct); // cartList 배열 업데이트
    }

    // 마지막 선택 상품 업데이트
    updateLastSelectedProduct(selectedProductId);

    // UI 업데이트
    updateAllUI();
  }
};

// 장바구니 아이템 액션 처리 (수량 변경, 삭제)
export const handleCartItemActions = (event) => {
  const targetElement = event.target;
  
  // 수량 변경 버튼 클릭
  if (targetElement.classList.contains('quantity-change')) {
    event.preventDefault();
    event.stopPropagation();
    
    const productId = targetElement.dataset.productId;
    const cartItemElement = document.getElementById(productId);
    const product = getProductById(productId);
    
    if (!cartItemElement || !product) return;

    const quantityChange = parseInt(targetElement.dataset.change);
    const quantityElement = cartItemElement.querySelector('.quantity-number');
    const currentQuantity = parseInt(quantityElement.textContent);
    const newQuantity = currentQuantity + quantityChange;

    if (newQuantity > 0) {
      // 증가하는 경우: 재고 확인
      if (quantityChange > 0 && product.stock < quantityChange) {
        alert('재고가 부족합니다.');
        return;
      }
      quantityElement.textContent = newQuantity;
      updateProductStock(product.id, -quantityChange); // 음수로 전달하여 재고 복원/차감
      
      // cartList 배열 업데이트
      if (quantityChange > 0) {
        addToCart(product);
      } else {
        removeFromCart(product);
      }
    } else if (newQuantity <= 0) {
      // 수량이 0 이하가 되면 아이템 제거
      restoreProductStock(product.id, currentQuantity);
      cartItemElement.remove();
      removeFromCart(product); // cartList 배열에서 완전 제거
    }

    // UI 업데이트
    updateAllUI();
  }
  // 아이템 제거 버튼 클릭
  else if (targetElement.classList.contains('remove-item')) {
    event.preventDefault();
    event.stopPropagation();
    
    const productId = targetElement.dataset.productId;
    const cartItemElement = document.getElementById(productId);
    const product = getProductById(productId);
    
    if (!cartItemElement || !product) return;

    const quantityElement = cartItemElement.querySelector('.quantity-number');
    const removedQuantity = parseInt(quantityElement.textContent);
    restoreProductStock(product.id, removedQuantity);
    cartItemElement.remove();
    
    // cartList 배열에서 완전 제거
    for (let i = 0; i < removedQuantity; i++) {
      removeFromCart(product);
    }

    // UI 업데이트
    updateAllUI();
  }
};

// 모든 UI 업데이트 함수
const updateAllUI = () => {
  updateHeaderItemCount();
  updateCartSelectOptions();
  updateStockInfo();
  
  // CartTotal 관련 UI 업데이트
  updateCartSummary();
  updateTotalPrice();
  updateDiscountInfo();
  updateLoyaltyPoints();
  updateTuesdaySpecial();
}; 