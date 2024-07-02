import { useState, useEffect, useRef } from 'react';
import styles from './Difficulty.module.scss';
import { Header } from '@/src/components/Header';
import { SHOWCARDS, NOSHOWCARDS } from '@/src/constants';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

type TProps = {
  changePage: (pageName: string) => void;
  setDifficulty: (difficulty: string) => void;
};

export const Difficulty = ({ changePage, setDifficulty }: TProps) => {
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

  const handleClickGoNext = (difficulty: string) => {
    setDifficulty(difficulty);
    changePage('amount');
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
            <div className={styles.heading}>Выберите уровень сложности</div>
            <div className={styles.list}>
              <button
                className={styles.item}
                onClick={() => handleClickGoNext(SHOWCARDS)}
              >
                Показать карточки перед игрой
              </button>
              <button
                className={styles.item}
                onClick={() => handleClickGoNext(NOSHOWCARDS)}
              >
                Не показывать карточки перед игрой
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
