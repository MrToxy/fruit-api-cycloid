import Worker from "./normalize.worker";

function flatten(object, all = []) {
  if (typeof object === "object" && !Array.isArray(object)) {
    Object.values(object).forEach((value) => {
      if (value.isFruit && value.id) {
        all.push(value);
      } else flatten(value, all);
    });
  }
  return all;
}
export async function normalizeFruits(fruits) {
  // Lets try to parse the fruits with the web Worker
  try {
    console.log("parsing fruits with the webworker");
    let parsedFruits = await Worker(fruits);
    return parsedFruits;
  } catch (_error) {
    console.log("unable to parse fruits with webworker. parsing normally");
  }
  // if it errors out we should try to parse it without the worker, if this fails throw an error
  try {
    console.log("parsing fruits without the webworker");
    let parsedFruits = flatten(fruits);
    return parsedFruits;
  } catch (error) {
    return Promise.reject(error);
  }
}

export function diffInDaysBetweenDates(startDate, endDate) {
  const current = new Date(startDate);
  endDate = new Date(endDate);
  const diffMs = endDate - current;
  return diffMs / (1000 * 60 * 60 * 24);
}
export class Query {
  constructor(data) {
    this.data = data;
    this.original = data;
  }

  where(cb) {
    this.data = this.data.filter(cb);

    return this;
  }
  tab(cb) {
    cb(this.data, this.original);
    return this;
  }

  whereBetween(prop, min, max) {
    this.data = this.data.filter(
      (fruit) => fruit[prop] >= min && fruit[prop] <= max
    );
    return this;
  }

  get() {
    return this.data;
  }
}
