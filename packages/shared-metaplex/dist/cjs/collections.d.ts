import { InputCollection, InputCollectionAuthority, OutputCollection, _InputCollection, _InputCollectionAuthority, _OutputCollection } from './types';
export declare namespace Collections {
    const toInputConvert: (input: InputCollection | undefined) => _InputCollection;
    const toInputAuthorityConvert: (input: InputCollectionAuthority | undefined) => _InputCollectionAuthority;
    const toOutputConvert: (output: _OutputCollection | undefined) => OutputCollection;
}
