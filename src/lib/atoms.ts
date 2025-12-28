import { atomWithStorage } from 'jotai/utils';

export const highScoreAtom = atomWithStorage('highScore', 0);
