require("dotenv").config();

const request = require("request-promise");

const API_KEY = process.env.API_KEY;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const LIST_ID_OKR = process.env.LIST_ID_OKR;
const API_URL_OKR = `https://api.trello.com/1/lists/${LIST_ID_OKR}/cards?key=${API_KEY}&token=${ACCESS_TOKEN}`;

async function main() {
  try {
    const okr = await request.get(API_URL_OKR);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let totalTime = 0;

    JSON.parse(okr).forEach((card) => {
      if (new Date(card.dateLastActivity).getTime() >= today.getTime()) {
        const time = timeOfCard(card);
        console.log(`- ${card.name}: ${time}h`);
        totalTime += time;
      }
    });

    console.log(`${totalTime}h`);
  } catch (e) {
    console.log(e);
  }
}

main();

function timeOfCard(card) {
  if (card.labels[0] === undefined) {
    return 0;
  }

  const textThirtyMinutes = "30minutes";
  const textOneHour = "1hour";
  const textTwoHours = "2hours";
  const textThreeHours = "3hours";
  const textFiveHours = "5hours";
  let total = 0;

  card.labels.forEach((label) => {
    switch (label.name) {
      case textThirtyMinutes:
        total += 0.5;
        break;
      case textOneHour:
        total += 1;
        break;
      case textTwoHours:
        total += 2;
        break;
      case textThreeHours:
        total += 3;
        break;
      case textFiveHours:
        total += 5;
        break;
    }
  });

  return total;
}
