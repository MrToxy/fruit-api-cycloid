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
  // Lets try to parse fruits with the web Worker
  try {
    console.log("parsing fruits with the webworker");
    let parsedFruits = await Worker(fruits);
    return parsedFruits;
  } catch (_error) {
    console.log("unable to parse fruits with webworker. parsing normally");
  }
  // if it errors out we should try to parse it without the worker
  try {
    console.log("parsing fruits without the webworker");
    let parsedFruits = flatten(fruits);
    return parsedFruits;
  } catch (error) {
    return Promise.reject(error);
  }
}
