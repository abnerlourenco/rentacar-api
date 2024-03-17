
interface IDateProvider {
  compareInHours: (start_date: string, end_date: string) => number
  convertToUTC: (date: Date) => string
  newDate: () => Date
}

export type { IDateProvider };
