import { useState, useEffect, useRef } from 'react';
import styles from './Start.module.scss';
import { Header } from '@/src/components/Header';
import { SHOWCARDS, NOSHOWCARDS } from '@/src/constants';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import sendEventToCounters from '../../countersEvents';

import icon1Src from '../../images/content/home-icon-2.svg';
import icon2Src from '../../images/content/home-icon-3.svg';

type TProps = {
  changePage: (pageName: string) => void;
  difficulty: string;
};

export const Start = ({ changePage, difficulty }: TProps) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 1);
    });
  }, []);

  const [isAnimated, setIsAnimated] = useState(false);
  const nodeRef = useRef(null);

  let timerId: ReturnType<typeof setTimeout> | undefined;

  useEffect(() => {
    timerId = setTimeout(() => {
      setIsAnimated(true);
    }, 1);

    return () => clearTimeout(timerId);
  }, []);

  const handleClickGoGame = () => {
    changePage('game');

    sendAnalytics('click-start');
  };

  const sendAnalytics = (label: string) => {
    sendEventToCounters({ action: 'explanation', label });
  };

  const renderContent = () => {
    if (difficulty === SHOWCARDS) {
      return (
        <div className={styles.text}>
          <div className={styles.textItem}>
            <img src={icon1Src} alt="" />
            <p>
              Перед&#160;вами откроются все&#160;карточки&#160;&#8211;
              постарайтесь запомнить, где&#160;располагаются парные картинки.
            </p>
          </div>
          <div className={styles.textItem}>
            <img src={icon2Src} alt="" />
            <p>
              Через&#160;несколько секунд карточки перевернутся рубашками вверх,
              и&#160;вы&#160;можете начинать. Кликайте на&#160;карточки
              и&#160;старайтесь собрать все&#160;пары за&#160;наименьшее
              количество ходов&#160;&#8211; так&#160;вы&#160;быстрее придёте
              к&#160;цели!
            </p>
          </div>
        </div>
      );
    } else if (difficulty === NOSHOWCARDS) {
      return (
        <div className={styles.text}>
          <div className={styles.textItem}>
            <img src={icon1Src} alt="" />
            <p>
              Переворачивайте карточки и&#160;старайтесь собрать все&#160;пары
              за&#160;наименьшее количество ходов&#160;&#8211;
              так&#160;вы&#160;быстрее придёте к&#160;цели!
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <Header type="start" />
        <CSSTransition
          in={isAnimated}
          timeout={200}
          nodeRef={nodeRef}
          classNames={{
            enterActive: styles.appearEnterActive,
            enterDone: styles.appearEnterDone,
            exit: styles.appearExit,
          }}
        >
          <div
            className={classNames(styles.content, styles.appear)}
            ref={nodeRef}
          >
            <div className={styles.heading}>Добро пожаловать в&#160;игру!</div>
            {renderContent()}
            <div className={styles.bottom}>
              Подбирайте верную комбинацию&#160;&#8211; открывайте новый факт
              об&#160;РЖД: о&#160;наших профессиях, достижениях и&#160;истории
              железных дорог!
            </div>
            <button className={styles.button} onClick={handleClickGoGame}>
              Начать
            </button>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
