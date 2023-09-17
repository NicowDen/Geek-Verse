const getErrors_simple = (errors) => {
  const keys = Object.keys(errors);
  const error = keys.reduce((toBuild, key, index) => {
    const value = errors[key];
    return index === 0 ? value : `${toBuild}, ${value}`;
  }, "");
  return error;
};

export const getErrors = (errors) =>
  Object.keys(errors).reduce(
    (toBuild, key, index) =>
      index === 0
        ? `${errors[key]} for ${key}`
        : `${toBuild}, ${errors[key]} for ${key}`,
    ""
  );

export const ERRORS = {
  required: `field required`,
  empty: `This field cannot be empty`,
  notValid: `{VALUE} is not a valid value`,
  moreThan10: `{VALUE} must has more than 10 charaters`,
};
