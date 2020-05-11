import create from 'zustand';
import { produce } from 'immer';
import { Workout } from './models/workout';


import pose2Img from './content/pose 2.png'
import pose1Img from './content/pose 1.png'
import pose22Img from './content/pose 22.png'
import pose21Img from './content/pose 21.png'
import pose32Img from './content/pose 32.png'
import pose31Img from './content/pose 31.png'
import pose42Img from './content/pose 42.png'
import pose41Img from './content/pose 41.png'
import pose52Img from './content/pose 52.png'
import pose51Img from './content/pose 51.png'

export interface Store {
  workouts: Workout[]
  set: (fn: (store: Store) => void) => void;
}

export const [useStore, api] = create<Store>(set => ({
  workouts: [
    {
      id: 1,
      name: 'Test workout',
      author: 'Tester01',
      poses: [
        pose1Img,
        pose2Img,
        pose1Img,
        pose2Img,
        pose1Img,
        pose2Img,
        pose1Img,
        pose2Img,
      ]
    },
    {
      id: 2,
      name: 'Test workout 2',
      author: 'Tester01',
      poses: [
        pose21Img,
        pose22Img,
        pose21Img,
        pose22Img,
        pose21Img,
        pose22Img,
      ]
    },
    {
      id: 3,
      name: 'Test workout 3',
      author: 'Tester01',
      poses: [
        pose31Img,
        pose32Img,
        pose31Img,
        pose32Img,
        pose31Img,
        pose32Img,
        pose31Img,
        pose32Img,
      ]
    },
    {
      id: 4,
      name: 'Test workout 4',
      author: 'Tester01',
      poses: [
        pose41Img,
        pose42Img,
        pose41Img,
        pose42Img,
      ]
    },
    {
      id: 5,
      name: 'Test workout 5',
      author: 'Tester01',
      poses: [
        pose51Img,
        pose52Img,
        pose51Img,
        pose52Img,
      ]
    },
  ],
  set: fn => set(produce(fn)),
}));