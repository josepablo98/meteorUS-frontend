
export const getSameJson = (firstJson = {}, secondJson = {}) : boolean => {
  const keys1 = Object.keys(firstJson);
  const keys2 = Object.keys(secondJson);

  keys1.sort();
  keys2.sort();

  return JSON.stringify(keys1) === JSON.stringify(keys2);
}
