
export class PaginationOptions {
  currentPage;
  firstRowOnPage;
  lastRowOnPage;
  pageCount;
  pageSize;
  rowCount;

  constructor(
    currentPage = 1,
    pageSize = 15,
    rowCount,
    pageCount,
    lastRowOnPage,
    firstRowOnPage
  ) {
    this.pageSize = pageSize;
    this.rowCount = rowCount;
    this.pageCount = pageCount;
    this.lastRowOnPage = lastRowOnPage;
    this.firstRowOnPage = firstRowOnPage;
    this.currentPage = currentPage;
  }
}
