import Worker from "./normalize.worker";

export async function normalizeFruits(fruits) {
  try {
    console.log("parsing fruits with the webworker");
    let parsedFruits = await Worker(fruits);
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
    this.data = this.data.filter((fruit) =>
      prop in fruit ? fruit[prop] >= min && fruit[prop] <= max : fruit
    );
    return this;
  }

  whereIn(prop, values) {
    if (values.length)
      this.data = this.data.filter(
        (fruit) => prop in fruit && values.includes(fruit[prop])
      );
    return this;
  }

  get() {
    return this.data;
  }
}
