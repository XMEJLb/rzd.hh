import { useRef } from 'react';
import styles from './Final.module.scss';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import sendEventToCounters from '../../countersEvents';

import final1Src from '../../images/content/final-1.png';
import final1MobSrc from '../../images/content/final-1-mob.png';
import final2Src from '../../images/content/final-2.png';
import final2MobSrc from '../../images/content/final-2-mob.png';
import final3Src from '../../images/content/final-3.png';
import final3MobSrc from '../../images/content/final-3-mob.png';
import { TScore } from '@/src/components/App';
import useGetResultPercent from '@/src/hooks/useGetResultPercent';

type TProps = {
  changePage: (pageName: string) => void;
  difficulty: string;
  amount: number;
  score: TScore;
  setScore: React.Dispatch<
    React.SetStateAction<{ moves: number; mistakes: number }>
  >;
};

export const Final = ({
  changePage,
  difficulty,
  amount,
  score,
  setScore,
}: TProps) => {
  const nodeRef = useRef(null);
  const voteRef = useRef(null);

  const { percent, isLoading } = useGetResultPercent(
    difficulty === 'noShowCards' ? 1 : 0,
    amount,
    score.moves,
    score.mistakes,
  );

  const sendAnalytics = (label: string) => {
    sendEventToCounters({ action: 'results', label });
  };

  const handleClickGoGameAgain = () => {
    changePage('difficulty');
    setScore({
      moves: 0,
      mistakes: 0,
    });
  };

  const renderContent = (percent: string) => {
    if (score.mistakes !== 0 && score.mistakes <= amount && percent !== '0') {
      return (
        <div
          className={classNames(styles.finalContent, styles.appearRight)}
          ref={nodeRef}
        >
          <div className={styles.finalText}>
            <div className={styles.finalHeading}>
              Поздравляем <br /> с&#160;отличной игрой!
            </div>
            {/* <p>Ваш результат лучше, чем у&#160;{percent}% игроков!</p> */}
          </div>
          <div className={styles.finalImage}>
            <picture>
              <source media="(max-width: 1023px)" srcSet={final2MobSrc} />
              <img src={final2Src} alt="" />
            </picture>
          </div>
        </div>
      );
    } else if (score.mistakes > amount || percent === '0') {
      return (
        <div
          className={classNames(styles.finalContent, styles.appearRight)}
          ref={nodeRef}
        >
          <div className={styles.finalText}>
            <div className={styles.finalHeading}>
              Прекрасный <br /> результат!
            </div>
            <p>
              Также&#160;попробуйте свои силы с&#160;другим количеством
              карточек&#160;&#8211; вас&#160;ждёт много интересных фактов
              об&#160;РЖД!
            </p>
          </div>
          <div className={styles.finalImage}>
            <picture>
              <source media="(max-width: 1023px)" srcSet={final3MobSrc} />
              <img src={final3Src} alt="" />
            </picture>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={classNames(styles.finalContent, styles.appearRight)}
          ref={nodeRef}
        >
          <div className={styles.finalText}>
            <div className={styles.finalHeading}>
              Вот это <br /> результат!
            </div>
            <p>
              Вы&#160;входите в&#160;{percent}% уникальных людей, которые смогли
              открыть&#160;все&#160;пары и&#160;ни&#160;разу не&#160;ошибиться!
            </p>
          </div>
          <div className={styles.finalImage}>
            <picture>
              <source media="(max-width: 1023px)" srcSet={final1MobSrc} />
              <img src={final1Src} alt="" />
            </picture>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <Header type="final" />
        <div className={styles.final}>
          <CSSTransition
            in={!isLoading}
            timeout={200}
            nodeRef={nodeRef}
            classNames={{
              enterActive: styles.appearRightEnterActive,
              enterDone: styles.appearRightEnterDone,
              exit: styles.appearRightExit,
            }}
          >
            {renderContent(percent)}
          </CSSTransition>
          <CSSTransition
            in={!isLoading}
            timeout={200}
            nodeRef={voteRef}
            classNames={{
              enterActive: styles.appearLeftEnterActive,
              enterDone: styles.appearLeftEnterDone,
              exit: styles.appearLeftExit,
            }}
          >
            <div
              className={classNames(styles.voteText, styles.appearLeft)}
              ref={voteRef}
            >
              <p>
                {/* Вы&#160;узнали столько фактов об&#160;РЖД&#160;&#8211; теперь
                вы&#160;настоящий эксперт! Поддержите&#160;нас
                в&#160;Рейтинге&#160;работодателей&#160;России */}
                Вы узнали столько фактов об РЖД - теперь вы настоящий эксперт!
                Хотите применить знания на практике? Выбирайте вакансию на нашем
                Карьерном портале
              </p>
              <div className={styles.buttons}>
                <a
                  href="https://team.rzd.ru/?utm_source=prd_hhmemo150524"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sendAnalytics('vote')}
                >
                  Выбрать
                </a>
                <button
                  className={styles.button}
                  onClick={handleClickGoGameAgain}
                >
                  Играть еще&#160;раз
                </button>
              </div>
            </div>
          </CSSTransition>
        </div>
        <Footer />
      </div>
    </div>
  );
};
