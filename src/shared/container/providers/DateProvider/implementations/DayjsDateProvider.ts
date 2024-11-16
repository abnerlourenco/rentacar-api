import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { type IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC (date: Date): string {
    const dateConvert = dayjs(date).utc().local().format();

    return dateConvert;
  }

  compareInHours (start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    const compareDate = dayjs(end_date_utc).diff(start_date_utc, 'hours');

    return compareDate;
  }

  newDate (): Date {
    const date = dayjs().toDate();

    return date;
  }

  compareInDays (start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    const compareDate = dayjs(end_date_utc).diff(start_date_utc, 'days');

    return compareDate;
  }

  addDays (days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours (hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  compareIfBefore (start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
