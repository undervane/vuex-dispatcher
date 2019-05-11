export class LoadOptions {
  force;
  persist;
  error = (error) => console.error = 'Missing error handling, thrown error: ' + error

  constructor(force = false, persist = false) {
    this.force = force;
    this.persist = persist;
  }
}