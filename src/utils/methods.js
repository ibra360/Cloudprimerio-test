export const getObjByKey = (array = [], val = "") => {
  let response = array?.length
    ? array?.find((obj) => {
        return obj[val];
      })
    : {};
  return response[val];
};
