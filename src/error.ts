export class TrybeError extends Error {
  errors: any;
  constructor(message?: string, errors?: any[]) {
    super(message ?? "Trybe Error");
    if (errors) {
      this.errors = errors;
    }
  }
}
