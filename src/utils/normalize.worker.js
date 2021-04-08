export default async (fruitsObject) => {
  const fruits = flatten(fruitsObject);
  return fruits;
};

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
