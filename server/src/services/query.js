const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 50;

function getPagination(query) {
  const page = Number(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(Number(query.limit)) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  }
}

module.exports = {
  getPagination,
}
