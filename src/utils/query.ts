// TODO write test cases

export const getMaxMinQuery = (
  field: string,
  min?: string,
  max?: string
): object => {
  if (max === undefined && min === undefined) return {};
  let query = {};
  query[field] = {};
  if (min !== undefined) {
    query[field]["$gt"] = Number.parseFloat(min);
  }
  if (max !== undefined) {
    query[field]["$lt"] = Number.parseFloat(max);
  }

  return query;
};
