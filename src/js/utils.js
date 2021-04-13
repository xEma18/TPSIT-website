import { TIMEOUT_SEC } from './config';

export const markup = `
<div class="vaccine-container">
  <div class="first-part">
    <div class="country-name">{%%NAME%%}</div>
    <div class="country-total-vaccines fx-center">💉 {%%TOTAL_VACCINATIONS%%}</div>
  </div>
  <div class="second-part">
    <div class="today mt-1 fx-vcenter">Oggi:</div>
    <div class="daily-vaccines mt-1 fx-hcenter">+{%%DAILY_VACCINATIONS%%}</div>
  </div>
</div>`;

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
