/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
export const range = (from: number, to: number, step = 1): Array<number> => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const fetchPageNumbers = (
  page: number,
  pageNeighbours: number,
  numberOfPages: number
): Array<number> => {
  const totalPages = numberOfPages;
  const currentPage = page + 1;

  /**
   * totalNumbers: the total page numbers to show on the control. Page itself + neighbouring pages
   */
  const totalNumbers = pageNeighbours * 2 + 1;

  const startPage = Math.max(1, currentPage - pageNeighbours);
  const endPage = Math.min(totalPages, currentPage + pageNeighbours);
  let pages = range(startPage, endPage);

  //for the first and last page, make sure there are 3 pages
  if (pageNeighbours === 1) {
    if (currentPage === 1 && numberOfPages > 2) {
      pages = [...pages, 3];
    }
    if (currentPage === numberOfPages) {
      pages = [numberOfPages - 2, ...pages];
    }
  }

  return [...pages];
};
