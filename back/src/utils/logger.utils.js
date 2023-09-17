export const log = (...datas) => {
  console.log("\x1b[1m\x1b[36m%s\x1b[0m", ...datas);
};

export const logError = (...datas) => {
  console.error("\x1b[1m\x1b[31m%s\x1b[0m", ...datas);
};
