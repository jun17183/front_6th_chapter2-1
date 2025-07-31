import { Product } from './entity';
import { CartItem } from './entity';
import { CartState } from './cart';
import { SaleEvent } from './events';

// ============== 컴포넌트 Props 타입 ==============

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