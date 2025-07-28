export const CartSelectBox = () => {

  const productList = [
    {
      id: 'p1',
      name: 'Keyboard',
      price: 10000,
      stock: 100,
    },
    {
      id: 'p2',
      name: 'Mouse',
      price: 20000,
      stock: 100,
    },
    {
      id: 'p3',
      name: 'Monitor Arm',
      price: 30000,
      stock: 100,
    },
    {
      id: 'p4',
      name: 'Laptop Pouch',
      price: 15000,
      stock: 100,
    },
    {
      id: 'p5',
      name: 'Speaker',
      price: 25000,
      stock: 100,
    },
  ];

  return /*html*/ `
    <div class="mb-6 pb-6 border-b border-gray-200">
      <!-- 상품 선택 드롭다운 -->
      <select id="product-select" class="w-full p-3 border border-gray-300 rounded-lg text-base mb-3">
        ${productList.map(product => /*html*/ `
          <option value="${product.id}">${product.name}</option>
        `).join('')}
      </select>

      <!-- 장바구니 추가 버튼 -->
      <button id="add-to-cart" class="w-full py-3 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-all">Add to Cart</button>

      <!-- 재고 정보 표시 -->
      <div id="stock-status" class="text-xs text-red-500 mt-3 whitespace-pre-line">

      </div>
    </div>
  `;
};  