import { Header } from './Header';
import { CartSelectBox, updateCartSelectOptions } from './CartSelectBox';
import { CartItemList } from './CartItemList';
import { CartTotal } from './CartTotal';
import { ManualToggleButton, Manual } from './Manual';

export const initializeRender = () => {
  // 메인 레이아웃 렌더링
  renderMainLayout();

  // 상품 선택 옵션 렌더링
  updateCartSelectOptions();
}

const MainLayout = /*html*/ `
  <!-- Header -->
  ${Header}

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 flex-1 overflow-hidden">

    <!-- Left Column -->
    <div class="bg-white border border-gray-200 p-8 overflow-y-auto">
      ${CartSelectBox}
      ${CartItemList}
    </div>

    <!-- Right Column -->
    <div class="bg-black text-white p-8 flex flex-col">
      ${CartTotal}
    </div>
  </div>

  <!-- Manual -->
  ${ManualToggleButton}
  ${Manual}
`;

const renderMainLayout = () => { 
  const root = document.getElementById('app');
  root.innerHTML = MainLayout;
}