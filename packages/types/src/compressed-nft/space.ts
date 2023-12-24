import { Secret } from '../account';

export type SpaceOptions = {
  feePayer: Secret;
};

export type SpaceNumber = 8 | 16000 | 100000 | 16700000 | 67000000 | 1000000000;
