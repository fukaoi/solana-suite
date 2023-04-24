import { Option, _Common, Infra } from '../shared';
export type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Infra.Creators[]>;
    collection: Option<Infra.Input.Collection>;
    uses: Option<_Common.Uses>;
};
