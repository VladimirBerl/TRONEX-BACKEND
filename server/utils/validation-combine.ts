export const useErrorCombiner = () => {
  const errors = [];
  let isNotEmpty = false;

  return {
    set(key, err) {
      isNotEmpty = true;
      const indexExists = errors.findIndex((item) => !!item[key]);

      if (indexExists !== -1) {
        errors[indexExists][key] = err;
      } else {
        errors.push({ [key]: err });
      }
    },
    get() {
      return errors;
    },
    isNotEmpty() {
      return isNotEmpty;
    },
  };
};
