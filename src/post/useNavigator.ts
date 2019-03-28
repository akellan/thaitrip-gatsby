import { useState, useCallback } from "react";

type NavigatorResult<T> = [T, (index: number) => void, () => void, () => void];

export default function useNavigator<T>(array: T[]): NavigatorResult<T> {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex(index => {
      return index === array.length - 1 ? 0 : index + 1;
    });
  }, []);

  const previousImage = useCallback(() => {
    setCurrentIndex(index => {
      return index === 0 ? array.length - 1 : index - 1;
    });
  }, []);
  return [array[currentIndex], setCurrentIndex, previousImage, nextImage];
}
