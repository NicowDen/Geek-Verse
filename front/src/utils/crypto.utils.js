import F from "node-forge";

export const hash = (toHash) => {
  toHash = toHash.replace(/\s/g, "");
  const md = F.md.sha512.create();
  md.update(toHash);
  return md.digest().toHex();
};
