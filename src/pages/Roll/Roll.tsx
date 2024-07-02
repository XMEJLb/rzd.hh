import styles from './Roll.module.scss';
import { Header } from '@/src/components/Header';

import rollSrc from '../../images/content/roll.svg';

export const Roll = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <Header type="roll" />
        <div className={styles.roll}>
          <img src={rollSrc} alt="" />
          <p>Для удобства игры переверните телефон</p>
        </div>
      </div>
    </div>
  );
};
