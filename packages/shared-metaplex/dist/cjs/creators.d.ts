import { User, Infra } from './types';
export declare namespace Creators {
    const toConvertInfra: (input: User.Creators[] | undefined) => Infra.Creators[];
    const toConvertUser: (output: Infra.Creators[]) => User.Creators[];
}
