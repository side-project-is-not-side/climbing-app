import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko'; // 한국어 로케일 import

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

dayjs.locale('ko'); // 한국어 로케일 설정

export const formatKST = (
  date: Date | number | string | undefined,
  format?: string,
) => {
  try {
    if (!date) return undefined;
    let parsedDate = dayjs(date);

    if (!parsedDate.isValid()) return undefined;

    const utcDate = parsedDate.utc();
    const kstDate = utcDate.utcOffset(9);

    return kstDate.format(format || 'YYYY.MM.DD');
  } catch (error) {
    console.error('Error formatting date:', error);
    return undefined;
  }
};
