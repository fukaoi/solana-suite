import { Secret } from './account.js';

type TransferOptions = {
    feePayer: Secret;
};

type GasLessTransferOptions = {
    isPriorityFee: boolean;
};

export { GasLessTransferOptions, TransferOptions };
