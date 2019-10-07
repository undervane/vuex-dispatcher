export class LoadOptions {

  force: boolean;
  persist: boolean;
  filters: any;
  pagination: any;
  data: any;

  loading: (status: boolean) => void;
  error = (error: string) => console.error('Missing error handling, thrown error: ' + error)

  constructor(force = false, persist = false) {
    this.force = force;
    this.persist = persist;
    this.loading = (status: boolean) => status;
  }
}