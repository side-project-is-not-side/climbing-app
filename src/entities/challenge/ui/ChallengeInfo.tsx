import {ChallengeDetail} from '../type';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';

interface Props {
  challenge?: ChallengeDetail;
  isStarted: boolean;
}

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
};

const ChallengeInfo = ({challenge, isStarted}: Props) => {
  const activityCount = Number(challenge?.activityCount) || 0;
  const successCount = Number(challenge?.successCount) || 0;
  const progress = (activityCount / successCount) * 100;

  const isCompleted = activityCount === successCount;

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => {
      if (opacity < 0.5) {
        return `#333539`;
      } else {
        return `#FF5544`;
      }
    },
  };

  return (
    <>
      <View className="relative h-[300px] justify-center items-center">
        {isCompleted && challenge?.successImageUrl ? (
          <Image
            src={challenge?.successImageUrl}
            alt="challenge badge"
            className={`w-[240px] h-[240px] ml-4 `}
            style={{opacity: 1}}
            blurRadius={0}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={
              isStarted
                ? require('/assets/images/challenge_large.png')
                : require('/assets/images/challenge_lock_large.png')
            }
            className="w-[240px] h-[240px]"
            blurRadius={isStarted ? 8 : 0}
          />
        )}
        {!isCompleted && isStarted && (
          <>
            <View className={`absolute`}>
              {challenge && (
                <ProgressChart
                  data={{
                    labels: ['진행률'],
                    data: [progress / 100],
                  }}
                  width={300}
                  height={300}
                  strokeWidth={14}
                  radius={99}
                  chartConfig={chartConfig}
                  hideLegend={true}
                />
              )}
            </View>
            <View className="absolute bg-[#fff] w-[184px] h-[184px] rounded-full opacity-10" />
            <View className="absolute w-[184px] h-[184px] rounded-full justify-center items-center">
              <Text className="text-grayscale-200 opacity-60">진행률</Text>
              <Text className="mb-2 text-[40px] font-bold text-primary-400">
                {activityCount}/{successCount}
              </Text>
              <Text className="text-white">뱃지 획득까지 {successCount - activityCount}개</Text>
            </View>
          </>
        )}
      </View>
      <View className="min-h-[100px] my-5">
        <Text className="text-xs font-bold  text-primary-400">
          {challenge && activityTypes[challenge.activityType]}
        </Text>
        <Text className="my-1 text-2xl font-bold leading-9  text-white">{challenge?.title}</Text>
        <Text className=" text-neutral-400">{challenge?.description}</Text>
      </View>
    </>
  );
};

export default ChallengeInfo;
