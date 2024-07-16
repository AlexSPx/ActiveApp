import { lineDataItem } from 'react-native-gifted-charts';
import { atom } from 'recoil';
import { storage } from '../stores/storage';

export type ExerciseWidgetProps = {
  key: string;
  id: string;
  name: string;
  type: ExerciseWidgetType;
  data: lineDataItem[];
};

export enum ExerciseWidgetType {
  ORM,
  VOLUME,
}

export const widgetsState = atom<ExerciseWidgetProps[]>({
  key: 'widgets',
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue, _oldValue) => {
        storage.set('widgets', JSON.stringify(newValue));
      });
    },
  ],
});
