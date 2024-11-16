
interface IDateProvider {
  compareInHours: (start_date: Date, end_date: Date) => number
  convertToUTC: (date: Date) => string
  newDate: () => Date
  compareInDays: (start_date: Date, end_date: Date) => number
  addDays: (days: number) => Date
  addHours: (hours: number) => Date
  compareIfBefore: (start_date: Date, end_date: Date) => boolean
}

export type { IDateProvider };
