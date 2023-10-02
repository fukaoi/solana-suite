import { UserSideOutput as SharendMetaplex } from '../converter';
import { CoreUserSideOutput as Internal } from './user-side/output';

export * from './find';
export * from './infra-side/output';
export * from './user-side/output';
export * from './sol-native';
export * from './spl-token';
export * from './transaction-filter';

export type Find = SharendMetaplex.TokenMetadata;
export type History = Internal.History;

export type OnOk<T extends Find | History> = (ok: T[]) => void;
export type OnErr = (err: Error) => void;
