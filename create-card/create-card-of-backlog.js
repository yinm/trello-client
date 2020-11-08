require("dotenv").config();

const request = require("request-promise");

const {
  API_KEY,
  ACCESS_TOKEN,
  LIST_ID,
  LABEL_ID_30_MINS,
  LABEL_ID_1_HOUR,
} = process.env;
const API_URL = `https://api.trello.com/1/cards?key=${API_KEY}&token=${ACCESS_TOKEN}&idList=${LIST_ID}`;

const cardName = "改善タスク";
const labelId = LABEL_ID_30_MINS;
// const cardName = "自由時間";
// const labelId = LABEL_ID_1_HOUR;
const cardInfo = `&name=${encodeURIComponent(cardName)}&idLabels=${labelId}`;

async function main() {
  try {
    await request.post(API_URL + cardInfo);
    console.log("created a card");
  } catch (e) {
    console.error(e);
  }
}

main();
