import axios from 'axios';
import qs from 'qs';

export const createText = (text: string) => ({ __html: text });

export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const specialCodeAPI = '3298rhfiwefbw87f93fhwyfbgwifuw';
const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://rzd.hh.ru/handlers/main.php'
    : '/handlers/main.php';
export const DEFAULT_ERROR_PERCENT = '66.48';

type TRequestParams = {
  signal: AbortSignal;
  level: number;
  cards: number;
  moves: number;
  errors: number;
};

export const getResultPercent = async ({
  signal,
  level,
  cards,
  moves,
  errors,
}: TRequestParams) => {
  const data = qs.stringify({
    special: specialCodeAPI,
    task: 'store',
    level,
    cards,
    moves,
    errors,
  });

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data,
    timeout: 10000,
    url: API_URL,
    signal,
  };

  const result = await axios(options)
    .then((result) => {
      const { data: resultData } = result;
      const { status, percent } = resultData;

      if (status === 1) {
        return percent;
      }

      return DEFAULT_ERROR_PERCENT;
    })
    .catch(() => DEFAULT_ERROR_PERCENT);

  return result;
};
