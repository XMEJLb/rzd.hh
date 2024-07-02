import styles from './Footer.module.scss';
import sendEventToCounters from '../../countersEvents';

import hhLogoSrc from '../../images/content/hh-logo.svg';

export const Footer = () => {
  const sendAnalytics = (label: string) => {
    sendEventToCounters({ action: 'footer', label });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <p>
          РЖД 2024 <b>©</b> <span>|</span>
        </p>
        <img src={hhLogoSrc} alt="" />
        <p>Бренд-центр</p>
      </div>
      <a
        href="https://hh.ru/employer/23427"
        target="_blank"
        rel="noreferrer"
        onClick={() => sendAnalytics('vacancies')}
      >
        Вакансии
      </a>
    </div>
  );
};
