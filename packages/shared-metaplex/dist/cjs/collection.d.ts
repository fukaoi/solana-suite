import { InputCollection, InputCollectionAuthority, OutputCollection, _InputCollection, _InputCollectionAuthority, _OutputCollection } from './types';
export declare namespace Collection {
    const toInputConvert: (input: InputCollection) => _InputCollection;
    const toInputAuthorityConvert: (input: InputCollectionAuthority) => _InputCollectionAuthority;
    const toOutputConvert: (output: _OutputCollection) => OutputCollection;
}
