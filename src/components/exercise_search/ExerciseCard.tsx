import React from 'react';
import { Button } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export interface Exercise {
  id: string;
  title: string;
  exerciseType: ExerciseType;
  equipment: Equipment;
  level: Level;
  force?: Force; // Optional since nullable in Java
  mechanic?: Mechanic; // Optional since nullable in Java
  primaryMuscles: Muscle[]; // List of primary muscles
  secondaryMuscles: Muscle[]; // List of secondary muscles
  instructions: string[]; // List of instructions
  category: Category; // Category field from Java entity
}

export enum ExerciseType {
  Strength = 'strength',
  Plyometrics = 'plyometrics',
  Cardio = 'cardio',
  Stretching = 'stretching',
  Powerlifting = 'powerlifting',
  Strongman = 'strongman',
  OlympicWeightlifting = 'olympic weightlifting',
  Other = 'other',
}

export enum Equipment {
  Barbell = 'barbell',
  Dumbbell = 'dumbbell',
  Kettlebells = 'kettlebells',
  Machine = 'machine',
  Cable = 'cable',
  BodyOnly = 'body only',
  Bands = 'bands',
  MedicineBall = 'medicine ball',
  Bench = 'bench',
  FoamRoll = 'foam roll',
  ExerciseBall = 'exercise ball',
  EZCurlBar = 'e-z curl bar',
  Other = 'other',
}

export enum Force {
  Static = 'static',
  Pull = 'pull',
  Push = 'push',
  Other = 'other',
}

export enum Level {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Expert = 'expert',
  None = 'none',
}

export enum Muscle {
  Abdominals = 'abdominals',
  Abductors = 'abductors',
  Adductors = 'adductors',
  Biceps = 'biceps',
  Calves = 'calves',
  Chest = 'chest',
  Forearms = 'forearms',
  Glutes = 'glutes',
  Hamstrings = 'hamstrings',
  Lats = 'lats',
  LowerBack = 'lower back',
  MiddleBack = 'middle back',
  Neck = 'neck',
  Quadriceps = 'quadriceps',
  Shoulders = 'shoulders',
  Traps = 'traps',
  Triceps = 'triceps',
  Other = 'other',
}

export enum Mechanic {
  Compound = 'compound',
  Isolation = 'isolation',
}

export enum Category {
  Powerlifting = 'powerlifting',
  Strength = 'strength',
  Stretching = 'stretching',
  Cardio = 'cardio',
  OlympicWeightlifting = 'olympic weightlifting',
  Strongman = 'strongman',
  Plyometrics = 'plyometrics',
  Other = 'other',
}

export default function ExerciseCard({
  exercise,
  colors,
  func,
}: {
  exercise: Exercise;
  colors: MD3Colors;
  func: (exercise: Exercise) => void;
}) {  
  return (
    <Button
      mode="outlined"
      style={{ marginVertical: 4 }}
      theme={{ colors: { primary: colors.secondary } }}
      onPress={() => func(exercise)}
    >
      {exercise.title}
    </Button>
  );
}
