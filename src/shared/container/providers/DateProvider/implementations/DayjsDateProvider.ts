import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { type IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC (date: Date): string {
    const dateConvert = dayjs(date).utc().local().format();

    return dateConvert;
  }

  compareInHours (start_date: string, end_date: string): number {
    const compareDate = dayjs(end_date).diff(start_date, 'hours');

    return compareDate;
  }

  newDate (): Date {
    const date = dayjs().toDate();

    return date;
  }
}

export { DayjsDateProvider };
