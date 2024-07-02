import { useMemo, useState } from 'react';
import { Home } from '@/src/pages/Home';
import { Difficulty } from '@/src/pages/Difficulty';
import { Amount } from '@/src/pages/Amount';
import { Start } from '@/src/pages/Start';
import { Game } from '@/src/pages/Game';
import { Final } from '@/src/pages/Final';
import './App.scss';

export type TScore = {
  moves: number;
  mistakes: number;
};

export const App = () => {
  const [page, setPage] = useState('home'); // home / difficulty / amount / start / game / final
  const [difficulty, setDifficulty] = useState(''); // showCards / noShowCards
  const [amount, setAmount] = useState(0); // 12 / 16 / 24
  const [score, setScore] = useState<TScore>({
    moves: 0,
    mistakes: 0,
  });

  const changePage = (pageName: string) => {
    setPage(pageName);
  };

  const renderCurrentPage = useMemo(() => {
    switch (page) {
      case 'home':
        return <Home changePage={changePage} />;
      case 'difficulty':
        return (
          <Difficulty changePage={changePage} setDifficulty={setDifficulty} />
        );
      case 'amount':
        return (
          <Amount
            changePage={changePage}
            difficulty={difficulty}
            setAmount={setAmount}
          />
        );
      case 'start':
        return <Start changePage={changePage} difficulty={difficulty} />;
      case 'game':
        return (
          <Game
            changePage={changePage}
            difficulty={difficulty}
            amount={amount}
            setScore={setScore}
          />
        );
      case 'final':
        return (
          <Final
            changePage={changePage}
            difficulty={difficulty}
            amount={amount}
            score={score}
            setScore={setScore}
          />
        );
      default:
        return <div className="error_render">Ошибка состояния приложения!</div>;
    }
  }, [page]);

  return <>{renderCurrentPage}</>;
};
