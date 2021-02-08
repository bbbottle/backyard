module.exports = (a) => {
  const {
    body_html: content,
    id,
    slug,
    title,
    updated_at,
  } = a;

  return {
    id,
    title,
    slug,
    content,
    updated_at
  }
};