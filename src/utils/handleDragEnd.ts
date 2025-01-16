import { ITEM_HEIGHT, SMALL_ITEM_HEIGHT } from '@/constants';
import { animate, MotionValue } from 'framer-motion';

const calculateIndex = (y: number, length: number) => {
  const rawIndex = Math.round(-y / ITEM_HEIGHT);
  return Math.min(Math.max(rawIndex, 0), length - 1);
};

const handleDragEnd = (
  variant: 'SMALL' | 'BIG',
  motionValue: MotionValue,
  items: string[],
  updateFn: (index: number) => void,
) => {
  const currentY = motionValue.get();
  const index = calculateIndex(currentY, items.length);
  const targetY =
    -index * (variant === 'SMALL' ? SMALL_ITEM_HEIGHT : ITEM_HEIGHT);

  animate(motionValue, targetY, {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    restDelta: 0.5,
  });

  updateFn(index);
};

export default handleDragEnd;
