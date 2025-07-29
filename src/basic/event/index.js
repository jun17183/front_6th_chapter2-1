import { handleAddToCart, handleCartItemActions } from './Cart.js';
import { startAutomaticEvents } from './Auto.js';

// 모든 이벤트 리스너 설정
export const setupAllEventListeners = () => {
  setupCartEvents();
  setupManualEvents();
  startAutomaticEvents();
};

// 장바구니 관련 이벤트 설정
const setupCartEvents = () => {
  // ADD TO CART 버튼 이벤트
  const addToCartButton = document.getElementById('add-to-cart');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', handleAddToCart);
  }

  // 장바구니 아이템 액션 이벤트 (이벤트 위임)
  const cartItemsContainer = document.getElementById('cart-items');
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', handleCartItemActions);
  }
};

// 매뉴얼 관련 이벤트 설정
const setupManualEvents = () => {
  // 매뉴얼 토글 버튼 이벤트
  const manualToggleButton = document.querySelector('[data-manual-toggle]');
  if (manualToggleButton) {
    manualToggleButton.addEventListener('click', () => {
      const manualOverlay = document.getElementById('manual-overlay');
      const manualPanel = document.getElementById('manual-panel');
      
      if (manualOverlay && manualPanel) {
        manualOverlay.classList.toggle('hidden');
        manualPanel.classList.toggle('translate-x-full');
      }
    });
  }

  // 매뉴얼 오버레이 클릭 이벤트 (배경 클릭 시 닫기)
  const manualOverlay = document.getElementById('manual-overlay');
  if (manualOverlay) {
    manualOverlay.addEventListener('click', (event) => {
      if (event.target === manualOverlay) {
        closeManual();
      }
    });
  }

  // 매뉴얼 패널 내부 클릭 이벤트 (닫기 버튼)
  const manualPanel = document.getElementById('manual-panel');
  if (manualPanel) {
    manualPanel.addEventListener('click', (event) => {
      if (event.target.id === 'close-manual') {
        closeManual();
      }
    });
  }
};

// 매뉴얼 닫기 함수
const closeManual = () => {
  const manualOverlay = document.getElementById('manual-overlay');
  const manualPanel = document.getElementById('manual-panel');
  
  if (manualOverlay && manualPanel) {
    manualOverlay.classList.add('hidden');
    manualPanel.classList.add('translate-x-full');
  }
}; 