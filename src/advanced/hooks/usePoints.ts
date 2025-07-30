import { useCallback } from 'react';
import { CartState, PointsInfo, UsePointsReturn } from '../types';
import { POINTS_POLICY, PRODUCT_IDS } from '../constants';
import { isTuesday } from '../utils/dateUtils';

/**
 * 포인트 계산을 위한 커스텀 훅
 */
export const usePoints = (): UsePointsReturn => {
  
  const calculatePoints = useCallback((cartState: CartState): PointsInfo => {
    const { items, totalAmount, totalItemCount } = cartState;
    
    if (items.length === 0) {
      return {
        base: 0,
        bonus: 0,
        total: 0,
        description: [],
        isTuesdayDouble: false,
      };
    }

    // 1. 기본 포인트 계산 (구매액의 0.1%)
    let basePoints = Math.floor(totalAmount * POINTS_POLICY.BASE_RATE);
    
    // 2. 화요일 2배 적용
    const tuesdayMultiplier = isTuesday() ? POINTS_POLICY.TUESDAY_MULTIPLIER : 1;
    basePoints *= tuesdayMultiplier;

    // 3. 보너스 포인트 계산
    let bonusPoints = 0;
    const bonusDescriptions: string[] = [];

    // 상품 조합 보너스
    const productIds = items.map(item => item.id);
    const hasKeyboard = productIds.includes(PRODUCT_IDS.KEYBOARD);
    const hasMouse = productIds.includes(PRODUCT_IDS.MOUSE);
    const hasMonitorArm = productIds.includes(PRODUCT_IDS.MONITOR_ARM);

    // 키보드+마우스 세트 보너스
    if (hasKeyboard && hasMouse) {
      bonusPoints += POINTS_POLICY.KEYBOARD_MOUSE_BONUS;
      bonusDescriptions.push('키보드+마우스 세트');
    }

    // 풀세트 보너스 (키보드+마우스+모니터암)
    if (hasKeyboard && hasMouse && hasMonitorArm) {
      bonusPoints += POINTS_POLICY.FULL_SET_BONUS;
      bonusDescriptions.push('풀세트 구매');
    }

    // 수량별 보너스
    const bulkBonusThresholds = Object.keys(POINTS_POLICY.BULK_PURCHASE_BONUS)
      .map(Number)
      .sort((a, b) => b - a); // 내림차순 정렬

    for (const threshold of bulkBonusThresholds) {
      if (totalItemCount >= threshold) {
        bonusPoints += POINTS_POLICY.BULK_PURCHASE_BONUS[threshold];
        bonusDescriptions.push(`대량구매(${threshold}개+)`);
        break; // 가장 높은 보너스만 적용
      }
    }

    const totalPoints = basePoints + bonusPoints;

    // 설명 텍스트 생성
    const descriptions: string[] = [];
    descriptions.push(`기본: ${basePoints}p`);
    
    if (isTuesday()) {
      descriptions.push('화요일 2배');
    }
    
    if (bonusDescriptions.length > 0) {
      descriptions.push(...bonusDescriptions);
    }

    return {
      base: basePoints,
      bonus: bonusPoints,
      total: totalPoints,
      description: descriptions,
      isTuesdayDouble: isTuesday(),
    };
  }, []);

  return {
    calculatePoints,
  };
};