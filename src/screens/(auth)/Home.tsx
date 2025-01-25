import { Avatar, useTheme } from 'react-native-paper';
import MainView from '../../components/MainView';
import { Text } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { authState } from '../../states/authState';
import { View } from 'react-native';
import { workoutHistoryAtom } from '../../states/cache/WorkoutHistoryAtom';
import { WeekActivities } from '../../components/home/WeekActivity';
import Widgets from '../../components/widgets/Widgets';

export default function Home() {
  const { colors } = useTheme();

  const [{ user }, _] = useRecoilState(authState);
  const [history, _setHistory] = useRecoilState(workoutHistoryAtom);

  return (
    <MainView colors={colors}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 20,
          maxHeight: 100,
        }}
      >
        <Avatar.Text
          size={100}
          label={
            user!.firstname[0].toUpperCase() + user!.lastname[0].toUpperCase()
          }
        />
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: '100%',
            paddingHorizontal: 10,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              lineHeight: 25,
            }}
          >
            Welcome back, {'\n'}
            {user?.firstname} {user?.lastname}
          </Text>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: colors.secondary,
                paddingRight: 6,
              }}
            >
              @{user?.username}
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: colors.secondary,
              }}
            >
              workouts: {history.data.length}
            </Text>
          </View>
        </View>
      </View>

      <WeekActivities colors={colors} history={history.data} />
      <Widgets history={history.data} />
    </MainView>
  );
}
