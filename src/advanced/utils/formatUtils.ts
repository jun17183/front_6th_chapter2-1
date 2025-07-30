/**
 * 숫자를 한국 통화 형식으로 포맷팅합니다.
 */
export const formatCurrency = (amount: number): string => {
  return `₩${amount.toLocaleString()}`;
};

/**
 * 할인율을 퍼센트 형식으로 포맷팅합니다.
 */
export const formatDiscountRate = (rate: number): string => {
  return `${(rate * 100).toFixed(1)}%`;
};

/**
 * 아이템 수량을 복수형으로 포맷팅합니다.
 */
export const formatItemCount = (count: number): string => {
  return `${count} item${count !== 1 ? 's' : ''}`;
};

/**
 * 포인트를 포맷팅합니다.
 */
export const formatPoints = (points: number): string => {
  return `${points}p`;
};

/**
 * 가격을 포맷팅합니다.
 */
export const formatPrice = formatCurrency;