import { initializeData } from './data/index.js';
import { initializeRender } from './render/index.js';
import { setupAllEventListeners } from './event/index.js';

// 애플리케이션 초기화
const initializeApp = () => {
  // 데이터 초기화
  initializeData();
  
  // UI 렌더링
  initializeRender();
  
  // 이벤트 리스너 설정
  setupAllEventListeners();
  
  console.log('🛒 Hanghae Online Store 초기화 완료!');
};

// DOM이 로드된 후 애플리케이션 시작
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM이 이미 로드된 경우 즉시 실행
  initializeApp();
} 