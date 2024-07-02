import { useState, useEffect, useRef } from 'react';
import styles from './Game.module.scss';
import { Header } from '@/src/components/Header';
import { SHOWCARDS, NOSHOWCARDS, allCards } from '@/src/constants';
import { shuffle, createText } from '@/src/utils';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import sendEventToCounters from '../../countersEvents';

import closeSrc from '../../images/content/close.svg';
import backSrc from '../../images/content/card.svg';

type TProps = {
  changePage: (pageName: string) => void;
  difficulty: string;
  amount: number;
  setScore: React.Dispatch<
    React.SetStateAction<{ moves: number; mistakes: number }>
  >;
};

type TCard = {
  id: string | number;
  name: string;
  img: string;
  title: string;
  text: string;
  isFound?: boolean;
  isOpen?: boolean;
  isChosen?: boolean;
  isPointer?: boolean;
};

export const Game = ({ changePage, difficulty, amount, setScore }: TProps) => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [isShowCards, setShowCards] = useState(false);
  const [firstCard, setFirstCard] = useState<TCard | null>(null);
  const [secondCard, setSecondCard] = useState<TCard | null>(null);
  const [infoCards, setInfoCards] = useState<TCard[]>([]);
  const [foundCards, setFoundCards] = useState<TCard[]>([]);
  const [moves, setMoves] = useState(0);
  let timerShowId: ReturnType<typeof setTimeout> | undefined;
  let timerCloseId: ReturnType<typeof setTimeout> | undefined;
  let timerDeleteId: ReturnType<typeof setInterval> | undefined;
  let timerFinalId: ReturnType<typeof setTimeout> | undefined;

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 1);
    });
  }, []);

  useEffect(() => {
    const initCards = shuffle<TCard>(allCards).slice(0, amount / 2);
    const shuffleCards = shuffle<TCard>(initCards.concat(initCards));
    const cardsWithId = shuffleCards.map((card: TCard, index: number) => ({
      ...card,
      id: index,
      isFound: false,
      isOpen: difficulty === SHOWCARDS ? true : false,
      isChosen: false,
      isPointer: difficulty === SHOWCARDS ? false : true,
    }));
    setCards(cardsWithId);
    if (difficulty === SHOWCARDS) {
      setShowCards(true);
    }
  }, []);

  useEffect(() => {
    if (isShowCards) {
      const noShowCards = () => {
        const newCards = cards.map((card) => ({
          ...card,
          isOpen: false,
          isPointer: true,
        }));
        setCards(newCards);
        setShowCards(false);
      };

      timerShowId = setTimeout(noShowCards, 6000);
    }

    return () => clearInterval(timerShowId);
  }, [isShowCards]);

  useEffect(() => {
    if (foundCards.length === amount / 2) {
      timerFinalId = setTimeout(() => changePage('final'), 2000);

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
    }

    return () => clearInterval(timerFinalId);
  }, [foundCards]);

  const sendAnalytics = (label: string) => {
    sendEventToCounters({ action: 'finish', label });
  };

  const handleClickCard = (card: TCard) => {
    if (firstCard === null) {
      setFirstCard(card);
    } else if (firstCard !== null && secondCard === null) {
      setSecondCard(card);
      const newCards = cards.map((card) => ({ ...card, isPointer: false }));
      setCards(newCards);
    }
  };

  useEffect(() => {
    if (firstCard !== null) {
      const newCards = cards.map((card) =>
        card.id === firstCard.id
          ? { ...card, isOpen: true, isChosen: true }
          : card,
      );
      setCards(newCards);
    }
    if (secondCard !== null) {
      const newCards = cards.map((card) =>
        card.id === secondCard.id
          ? { ...card, isOpen: true, isChosen: true }
          : card,
      );
      setCards(newCards);
    }

    const closeCards = () => {
      const newCards = cards.map((card) =>
        card.id === firstCard?.id || card.id === secondCard?.id
          ? { ...card, isOpen: false, isPointer: true, isChosen: false }
          : { ...card, isPointer: true },
      );
      setCards(newCards);
      setFirstCard(null);
      setSecondCard(null);
    };

    const deleteCards = () => {
      const newCards = cards.map((card) =>
        card.id === firstCard?.id || card.id === secondCard?.id
          ? { ...card, isFound: true }
          : { ...card, isPointer: true },
      );
      setCards(newCards);
      if (firstCard !== null) {
        setFoundCards((prevState) => [...prevState, firstCard]);
      }
      setFirstCard(null);
      setSecondCard(null);
    };

    if (firstCard !== null && firstCard.name === secondCard?.name) {
      setMoves(moves + 1);
      setScore((prevState) => ({
        ...prevState,
        moves: prevState.moves + 1,
      }));

      timerCloseId = setTimeout(deleteCards, 1000);
      setInfoCards((prevState) => [...prevState, firstCard]);
    }

    if (
      firstCard !== null &&
      secondCard !== null &&
      firstCard?.name !== secondCard.name
    ) {
      setMoves(moves + 1);
      setScore((prevState) => ({
        ...prevState,
        moves: prevState.moves + 1,
        mistakes: prevState.mistakes + 1,
      }));

      timerCloseId = setTimeout(closeCards, 1000);
    }

    return () => clearInterval(timerCloseId);
  }, [firstCard, secondCard]);

  const handleOpenInfo = (card: TCard) => {
    if (!infoCards.includes(card)) {
      setInfoCards((prevState) => [...prevState, card]);
    }
  };

  const handleCloseInfo = (card: TCard) => {
    const newCards = infoCards.filter((infoCard) => infoCard !== card);
    setInfoCards(newCards);
  };

  useEffect(() => {
    if (infoCards.length > 1) {
      const newInfoCards = infoCards.slice(1);
      setInfoCards(newInfoCards);
    }

    const deleteInfo = () => {
      const newInfoCards = infoCards.slice(1);
      setInfoCards(newInfoCards);
    };

    if (infoCards.length > 0) {
      timerDeleteId = setInterval(deleteInfo, 4000);
    }

    return () => clearInterval(timerDeleteId);
  }, [timerDeleteId, infoCards]);

  const [isAnimated, setIsAnimated] = useState(false);
  const nodeRef = useRef(null);

  let timerId: ReturnType<typeof setTimeout> | undefined;

  useEffect(() => {
    timerId = setTimeout(() => {
      setIsAnimated(true);
    }, 1);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <Header type="game" />
        <div className={styles.score}>
          <p>
            ходов: <span>{moves}</span>
          </p>
        </div>
        <div className={styles.info}>
          {infoCards &&
            infoCards.map((card) => (
              <div key={card.id} className={styles.infoItem}>
                <div
                  className={styles.infoClose}
                  onClick={() => handleCloseInfo(card)}
                >
                  <img src={closeSrc} alt="" />
                </div>
                <div
                  className={styles.infoHeading}
                  dangerouslySetInnerHTML={createText(card.title)}
                ></div>
                <div
                  className={styles.infoText}
                  dangerouslySetInnerHTML={createText(card.text)}
                ></div>
              </div>
            ))}
        </div>
        <div className={styles.fields}>
          <div className={styles.field}>
            <CSSTransition
              in={isAnimated}
              timeout={200}
              nodeRef={nodeRef}
              classNames={{
                enterActive: styles.fadeEnterActive,
                enterDone: styles.fadeEnterDone,
                exit: styles.fadeExit,
              }}
            >
              <div
                className={classNames(
                  styles.cards,
                  styles[`cards--${amount}`],
                  styles.fade,
                )}
                ref={nodeRef}
              >
                {cards &&
                  cards.map((card) => (
                    <div
                      className={classNames(
                        styles.card,
                        {
                          [styles.found]: card.isFound,
                        },
                        {
                          [styles.open]: card.isOpen,
                        },
                        {
                          [styles.pointer]: card.isPointer,
                        },
                        {
                          [styles.chosen]: card.isChosen,
                        },
                      )}
                      key={card.id}
                      onClick={() => handleClickCard(card)}
                    >
                      <div className={styles.cardFront}>
                        <img src={card.img} alt="" />
                      </div>
                      <div className={styles.cardBack}>
                        <img src={backSrc} alt="" />
                      </div>
                    </div>
                  ))}
              </div>
            </CSSTransition>
          </div>
          <div className={styles.foundField}>
            <div className={styles.foundCards}>
              {foundCards &&
                foundCards.map((card, index) => (
                  <div
                    className={classNames(
                      styles.foundItem,
                      styles[`foundItem--${index}`],
                    )}
                    key={card.id}
                    onClick={() => handleOpenInfo(card)}
                  >
                    <img src={card.img} alt="" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
