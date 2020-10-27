module.exports = {
  verifyRequestBody(obj, props = []) {
    if (Array.isArray(obj) || typeof obj !== 'object') return false;
    if (!Array.isArray(props)) return false;
    if (Object.keys(obj).length !== props.length) return false;

    let found = true;
    props.forEach((prop) => {
      if (Object.keys(obj).indexOf(prop) < 0) {
        let found = false;
        return;
      }
    });

    return found;
  },
};
