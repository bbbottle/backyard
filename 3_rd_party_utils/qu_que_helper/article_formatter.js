module.exports = (a) => {
  const { body_html: content, ...rest } = a;
  return { content, ...rest };
};