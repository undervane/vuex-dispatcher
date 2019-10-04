
export class PaginationOptions {
  pageSize: number;
  currentPage: number;
  firstRowOnPage?: number;
  lastRowOnPage?: number;
  pageCount?: number;
  rowCount?: number;

  constructor(
    pageSize = 15,
    currentPage = 1,
  ) {
    this.pageSize = pageSize;
    this.currentPage = currentPage;
  }
}
