import { ICollection, OCollection } from './types';
export declare namespace Collections {
    const toInputConvert: (input: ICollection | undefined) => any;
    const toOutputConvert: (output: OCollection | undefined) => OCollection;
}
