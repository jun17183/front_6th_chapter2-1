import { Header } from "./components/Header";
import { CartSelectBox } from "./components/CartSelectBox";
import { CartItemList } from "./components/CartItemList";
import { CartTotal } from "./components/CartTotal";
import { ManualToggleButton } from "./components/ManualToggleButton";
import { Manual } from "./components/Manual";

export const CartApp = () => {

  return /*html*/ `
    <!-- Header -->
    ${Header()}

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 flex-1 overflow-hidden">

      <!-- Left Column -->
      <div class="bg-white border border-gray-200 p-8 overflow-y-auto">
        ${CartSelectBox()}
        ${CartItemList()}
      </div>

      <!-- Right Column -->
      <div class="bg-black text-white p-8 flex flex-col">
        ${CartTotal()}
      </div>
    </div>

    <!-- Manual -->
    ${ManualToggleButton()}
    ${Manual()}
  `;
}