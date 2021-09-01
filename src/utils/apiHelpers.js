export const publishedDateComparator = (first, second) =>
  Date.parse(second.published_at) - Date.parse(first.published_at);
