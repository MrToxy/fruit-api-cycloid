export default async (fruitsObject) => {
  const fruits = flatten(fruitsObject);
  return fruits;
};

// unfortunately web workers do not cope well with functions because they cant clone them properly
// in this case DRY < performance since its a small piece of code to maintain
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
