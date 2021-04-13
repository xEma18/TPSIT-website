import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise((_, rej) => {
    setTimeout(rej, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const request = fetch(url);
    const res = await Promise.race([request, timeout(TIMEOUT_SEC)]);

    if (!res.ok) throw new Error("Couldn't load the data!");

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
