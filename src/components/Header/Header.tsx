import styles from './Header.module.scss';
import classNames from 'classnames';

import logoSrc from '../../images/content/logo.svg';

type TProps = {
  type: string;
};

export const Header = ({ type }: TProps) => {
  const renderLogo = () => {
    return <img src={logoSrc} alt="" />;
  };

  return (
    <div className={classNames(styles.header, styles[`header--${type}`])}>
      <div className={styles.logo}>{renderLogo()}</div>
    </div>
  );
};
