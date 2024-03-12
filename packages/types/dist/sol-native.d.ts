import { Secret } from './account.js';

type TransferOptions = {
    feePayer: Secret;
};

type GasLessTransferOptions = {
    isPriorityFee: boolean;
};

export type { GasLessTransferOptions, TransferOptions };
