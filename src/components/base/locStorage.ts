// export interface ILocStorage {
//   update(key: string, data: string | string[]): void,
//   append(key: string, data: string | string[]): void,
//   get(key: string): string[],
//   removeItem(key: string, value: string): void,
//   clear(): void
// }

export class LocStorage {
  private static separator = ',';

  static update(key: string, data: string[] | string): void {
    if (Array.isArray(data)) {
      localStorage.setItem(key, data.join(this.separator));
    } else {
      localStorage.setItem(key, data);
    }
  }

  static append(key: string, data: string[] | string): void {
    const currentValue = localStorage[key] ? localStorage[key] + ',' : '';

    if (Array.isArray(data)) {
      localStorage.setItem(key, currentValue + data.join(this.separator));
    } else {
      localStorage.setItem(key, currentValue + data);
    }
  }

  static get(key: string): string[] {
    return localStorage[key] ? localStorage[key].split(this.separator) : []
  }

  static removeItem(key: string, value: string) {
    if (localStorage[key]) {
      const values = localStorage[key].split(this.separator);
      if (values.includes(value)) {
        const index = values.findIndex((i: string) => i === value);
        values.splice(index, 1);
      }
      this.update(key, values);
    }
  }

  static clear(): void {
    localStorage.clear();
  }

}