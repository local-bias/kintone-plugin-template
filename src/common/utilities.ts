export const parsable = (target: any) => {
  try {
    JSON.parse(target);
  } catch (error) {
    return false;
  }
  return true;
};
