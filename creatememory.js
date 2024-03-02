const memory = (sizeinbites) => {
  const ab = new ArrayBuffer(sizeinbites);
  const dv = new DataView(ab);
  return dv;
};
module.exports = memory;
