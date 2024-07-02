import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './Home.module.scss';
import sendEventToCounters from '../../countersEvents';

// import linkStarSrc from '../../images/content/star.svg';
import topSrc from '../../images/content/home.svg';
import topTabSrc from '../../images/content/home-tab.svg';
import topMobSrc from '../../images/content/home-mob.svg';
import icon1Src from '../../images/content/home-icon-1.svg';
import icon2Src from '../../images/content/home-icon-2.svg';
import icon3Src from '../../images/content/home-icon-3.svg';

type TProps = {
  changePage: (pageName: string) => void;
};

export const Home = ({ changePage }: TProps) => {
  const handleClickGoGame = () => {
    changePage('difficulty');

    sendAnalytics('play-game');
  };

  const sendAnalytics = (label: string) => {
    sendEventToCounters({ action: 'landing-page', label });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <Header type="home" />
        <div className={styles.ratingWrap}>
          <div className={styles.ratingLink}>
            {/* <a
              href="https://rating.hh.ru/poll/?utm_source=rzd&utm_medium=referral&utm_campaign=special_project"
              target="_blank"
              rel="noreferrer"
              onClick={() => sendAnalytics('support-in-rating')}
            >
              <img src={linkStarSrc} alt="" />
              <p>
                Поддерживаем связь между городами и&#160;людьми.
                <span>Поддержите&#160;нас в&#160;Рейтинге hh.ru!</span>
              </p>
            </a> */}
          </div>
        </div>
        <div className={styles.top}>
          <div className={styles.topText}>
            <div className={styles.topHeading}>
              Какой он&#160;— мир железных&#160;дорог?
            </div>
            <p>
              Мы&#160;связываем людей и&#160;города, развиваем сообщение
              между&#160;самыми удалёнными точками страны и&#160;первыми
              внедряем инновации, которые меняют жизнь миллионов людей
              к&#160;лучшему!{' '}
              <span>
                В&#160;этом нам&#160;помогают настоящие профессионалы своего
                дела и&#160;передовые технологии&#160;&#8211; хотите узнать,
                какие?
              </span>
            </p>
          </div>
          <div className={styles.rules}>
            <div className={styles.rulesList}>
              <div className={styles.rulesItem}>
                <div className={styles.rulesIcon}>
                  <img src={icon1Src} alt="" />
                </div>
                <p>Выберите уровень сложности игры</p>
              </div>
              <div className={styles.rulesItem}>
                <div className={styles.rulesIcon}>
                  <img src={icon2Src} alt="" />
                </div>
                <p>Выберите количество карточек для&#160;игры</p>
              </div>
              <div className={styles.rulesItem}>
                <div className={styles.rulesIcon}>
                  <img src={icon3Src} alt="" />
                </div>
                <p>
                  Переворачивайте карточки с&#160;помощью клика и&#160;собирайте
                  одинаковые пары
                </p>
              </div>
            </div>
            <button className={styles.button} onClick={handleClickGoGame}>
              Играть
            </button>
          </div>
          <div className={styles.topImage}>
            <picture>
              <source media="(max-width: 1023px)" srcSet={topMobSrc} />
              <source media="(max-width: 1439px)" srcSet={topTabSrc} />
              <img src={topSrc} alt="" />
            </picture>
          </div>
          <div className={styles.infoText}>
            Примите участие в&#160;нашей игре и&#160;узнайте, из&#160;чего
            состоит мир&#160;РЖД!
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
