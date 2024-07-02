import { useState, useEffect, useRef } from 'react';
import styles from './Amount.module.scss';
import { Header } from '@/src/components/Header';
import { SHOWCARDS, NOSHOWCARDS } from '@/src/constants';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import sendEventToCounters from '../../countersEvents';

type TProps = {
  changePage: (pageName: string) => void;
  difficulty: string;
  setAmount: (amount: number) => void;
};

export const Amount = ({ changePage, difficulty, setAmount }: TProps) => {
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

  const handleClickGoNext = (amount: number) => {
    setAmount(amount);
    changePage('start');

    if (difficulty === SHOWCARDS) {
      switch (amount) {
        case 12:
          sendAnalytics('show-cards-12');
          break;
        case 16:
          sendAnalytics('show-cards-16');
          break;
        case 24:
          sendAnalytics('show-cards-24');
          break;
        default:
          break;
      }
    }

    if (difficulty === NOSHOWCARDS) {
      switch (amount) {
        case 12:
          sendAnalytics('doesnt-show-cards-12');
          break;
        case 16:
          sendAnalytics('doesnt-show-cards-16');
          break;
        case 24:
          sendAnalytics('doesnt-show-cards-24');
          break;
        default:
          break;
      }
    }
  };

  const sendAnalytics = (label: string) => {
    sendEventToCounters({ action: 'sittings', label });
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
            <div className={styles.heading}>Выберите количество карточек</div>
            <div className={styles.list}>
              <button
                className={styles.item}
                onClick={() => handleClickGoNext(12)}
              >
                12
              </button>
              <button
                className={styles.item}
                onClick={() => handleClickGoNext(16)}
              >
                16
              </button>
              <button
                className={styles.item}
                onClick={() => handleClickGoNext(24)}
              >
                24
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
