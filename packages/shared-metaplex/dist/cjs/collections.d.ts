import { User, Infra } from './types';
export declare namespace Collections {
    const toConvertInfra: (input: User.Collection | undefined) => Infra.Collection;
    const toConvertUser: (output: Infra.Collection | undefined) => User.Collection;
}
