import { CartItem } from './entity';
import { DiscountInfo } from './discount';
import { PointsInfo } from './points';

// ============== 장바구니 상태 타입 ==============

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItemCount: number;
  discountInfo: DiscountInfo | null;
  pointsInfo: PointsInfo;
} 