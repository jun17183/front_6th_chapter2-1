// ===== 기본 엔터티 타입 =====

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
  isOnSale: boolean;
  isSuggestedSale: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

// ===== 할인 관련 타입 =====

export interface DiscountInfo {
  rate: number;
  amount: number;
  type: 'individual' | 'bulk' | 'tuesday' | 'lightning' | 'suggested' | 'super';
  description: string;
}

export interface DiscountPolicy {
  BULK_PURCHASE_THRESHOLD: number;
  BULK_PURCHASE_RATE: number;
  INDIVIDUAL_DISCOUNT_THRESHOLD: number;
  TUESDAY_DISCOUNT_RATE: number;
  LIGHTNING_SALE_RATE: number;
  SUGGESTED_SALE_RATE: number;
  SUPER_SALE_RATE: number;
}

export interface ProductDiscountRate {
  [productId: string]: number;
}

// ===== 포인트 관련 타입 =====

export interface PointsInfo {
  base: number;
  bonus: number;
  total: number;
  description: string[];
  isTuesdayDouble: boolean;
}

export interface PointsPolicy {
  BASE_RATE: number;
  TUESDAY_MULTIPLIER: number;
  KEYBOARD_MOUSE_BONUS: number;
  FULL_SET_BONUS: number;
  BULK_PURCHASE_BONUS: {
    [threshold: number]: number;
  };
}

// ===== 자동 이벤트 관련 타입 =====

export interface AutoEventConfig {
  LIGHTNING_SALE_INTERVAL: number;
  SUGGESTED_SALE_INTERVAL: number;
  LIGHTNING_SALE_DELAY: number;
  SUGGESTED_SALE_DELAY: number;
}

export interface SaleEvent {
  type: 'lightning' | 'suggested';
  productId: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  startTime: Date;
  endTime?: Date;
}

// ===== 장바구니 상태 타입 =====

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItemCount: number;
  discountInfo: DiscountInfo | null;
  pointsInfo: PointsInfo;
}

// ===== 액션 타입 =====

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_LIGHTNING_SALE'; payload: { productId: string; discountRate: number } }
  | { type: 'APPLY_SUGGESTED_SALE'; payload: { productId: string; discountRate: number } }
  | { type: 'RESET_SALE_STATUS'; payload: string }
  | { type: 'UPDATE_STOCK'; payload: { productId: string; quantity: number } };

// ===== UI 상태 타입 =====

export interface UIState {
  isManualOpen: boolean;
  selectedProductId: string;
  lowStockItems: Product[];
  outOfStockItems: Product[];
  activeSales: SaleEvent[];
}

export type UIAction =
  | { type: 'TOGGLE_MANUAL' }
  | { type: 'SELECT_PRODUCT'; payload: string }
  | { type: 'UPDATE_STOCK_STATUS'; payload: { lowStock: Product[]; outOfStock: Product[] } }
  | { type: 'ADD_SALE_EVENT'; payload: SaleEvent }
  | { type: 'REMOVE_SALE_EVENT'; payload: string };

// ===== 컴포넌트 Props 타입 =====

export interface ProductSelectProps {
  products: Product[];
  selectedProductId: string;
  onProductSelect: (productId: string) => void;
  onAddToCart: () => void;
  activeSales: SaleEvent[];
}

export interface CartItemProps {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface CartTotalProps {
  cartState: CartState;
  lowStockItems: Product[];
  outOfStockItems: Product[];
}

// ===== 훅 반환 타입 =====

export interface UseCartReturn {
  cartState: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateCartItemPrices: (updatedProducts: Product[]) => void;
}

export interface UseProductsReturn {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  updateStock: (productId: string, quantity: number) => void;
  getLowStockItems: () => Product[];
  getOutOfStockItems: () => Product[];
  startLightningSale: (productId: string) => void;
  startSuggestedSale: (productId: string) => void;
  resetSaleStatus: (productId: string) => void;
}

export interface UseDiscountReturn {
  calculateDiscount: (cartState: CartState) => DiscountInfo | null;
  applyLightningSale: (productId: string) => void;
  applySuggestedSale: (productId: string, lastSelectedProductId: string) => void;
  resetSaleStatus: (productId: string) => void;
}

export interface UsePointsReturn {
  calculatePoints: (cartState: CartState) => PointsInfo;
}

export interface UseAutoEventsReturn {
  activeSales: SaleEvent[];
  startAutoEvents: (lastSelectedProductId: string) => void;
  stopAutoEvents: () => void;
}