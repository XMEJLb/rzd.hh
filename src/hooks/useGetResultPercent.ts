import { useEffect, useState } from 'react';
import { DEFAULT_ERROR_PERCENT, getResultPercent } from '../utils';

const useGetResultPercent = (
  level: number,
  cards: number,
  moves: number,
  errors: number,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const asyncEffect = async () => {
      setIsLoading(true);

      try {
        const percent = await getResultPercent({
          signal: controller.signal,
          level,
          cards,
          moves,
          errors,
        });
        setPercent(percent);
      } catch (error) {
        setPercent(DEFAULT_ERROR_PERCENT);
      }

      setIsLoading(false);
    };

    asyncEffect();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    percent,
    isLoading,
  };
};

export default useGetResultPercent;
