import { InputCollection, OutputCollection, _InputCollection, _OutputCollection } from './types';
export declare namespace Collections {
    const toInputConvert: (input: InputCollection | undefined) => _InputCollection;
    const toOutputConvert: (output: _OutputCollection | undefined) => OutputCollection;
}
