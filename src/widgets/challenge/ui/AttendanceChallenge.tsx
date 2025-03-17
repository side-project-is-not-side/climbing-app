import {ChallengeInfo, useGetChallengeDetail} from '@entities/challenge';
import {ActivityAttendance, ActivityType} from '@entities/challenge/type';
import {usePostAttendance} from '@features/verification/queries';
import {Button} from '@shared/ui';
import AttendanceChecked from '@shared/ui/Icons/AttendanceChecked';
import AttendanceMissed from '@shared/ui/Icons/AttendanceMissed';
import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

type Props = {
  challengeId: number;
  activityType: ActivityType;
};

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'ko';

const DayComponent = React.memo(({date, marking}: {date: DateData; marking?: {marked: boolean}}) => {
  const isToday = useMemo(() => {
    const today = new Date();
    return date.day === today.getDate() && date.month === today.getMonth() + 1 && date.year === today.getFullYear();
  }, [date]);

  return (
    <View style={styles.dayContainer}>
      <Text style={[styles.dayText, isToday && styles.todayText]}>{date.day}</Text>
      <View style={styles.iconContainer}>
        {marking?.marked ? <AttendanceChecked width={40} height={40} /> : <AttendanceMissed width={40} height={40} />}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  dayContainer: {
    width: 40,
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: '#B8B8B8',
  },
  todayText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: 'white',
    width: 28,
    height: 18,
    backgroundColor: '#FF5544',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: 20,
  },
});

export const AttendanceChallenge = ({challengeId, activityType}: Props) => {
  const {data: challenge, mutate} = useGetChallengeDetail(challengeId, activityType);
  const {trigger, isMutating, data} = usePostAttendance(challengeId, challenge?.title ?? '');

  const isSuccess =
    !!data ||
    (challenge &&
      challenge.records.find(item => {
        const date = new Date(item.createdAt);
        const today = new Date();
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      }));

  const records: ActivityAttendance[] = challenge?.records ?? [];

  const markedDates = useMemo(() => {
    return records.reduce((acc, record) => {
      const date = new Date(record.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      acc[dateString] = {marked: true};
      return acc;
    }, {} as Record<string, {marked: boolean}>);
  }, [records]);

  const handleVerify = () => {
    trigger();
  };

  useEffect(() => {
    if (data) {
      mutate();
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <ChallengeInfo challenge={challenge} isStarted />

        <View style={{gap: 20}}>
          <Text className="font-header-3 text-sm text-white">인증 기록</Text>

          {challenge && (
            <Calendar
              style={{backgroundColor: 'transparent', gap: 10}}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: 'white',
                textSectionTitleFontFamily: 'Pretendard',
                textSectionTitleFontSize: 14,
              }}
              renderHeader={() => null}
              hideArrows
              markingType="custom"
              markedDates={markedDates}
              dayComponent={DayComponent}
              hideExtraDays
            />
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleVerify} disabled={isMutating || isSuccess}>
          {isSuccess ? '내일 또 만나요!' : '인증하기'}
        </Button>
      </View>
    </ScrollView>
  );
};
