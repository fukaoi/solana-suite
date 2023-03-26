import { User, Infra } from './types';
export declare namespace Collections {
    const toConvertInfra: (input: User.Input.Collection | undefined) => Infra.Input.Collection;
    const toConvertUser: (output: Infra.Output.Collection | undefined) => User.Output.Collection;
}
