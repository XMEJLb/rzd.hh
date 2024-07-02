import { useEffect, useState } from 'react';

const useLandscapeOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const mediaQueryList = window.matchMedia('(orientation: portrait)');

  useEffect(() => {
    if (mediaQueryList.matches) {
      setIsLandscape(false);
    } else {
      setIsLandscape(true);
    }
  }, [mediaQueryList]);

  useEffect(() => {
    const handler = (evt: MediaQueryListEvent) => {
      if (evt.matches) {
        setIsLandscape(false);
      } else {
        setIsLandscape(true);
      }
    };

    if (mediaQueryList?.addEventListener) {
      mediaQueryList.addEventListener('change', handler);
    } else {
      mediaQueryList.addListener(handler);
    }
  }, [isLandscape]);

  return isLandscape;
};

export default useLandscapeOrientation;
