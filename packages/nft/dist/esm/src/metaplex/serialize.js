import { deserializeUnchecked, serialize } from 'borsh';
import { MetaplexInstructure } from './';
import { PublicKey } from '@solana/web3.js';
export var MetaplexSerialize;
(function (MetaplexSerialize) {
    const REPLACE = new RegExp('\u0000', 'g');
    MetaplexSerialize.serializeCreateArgs = (data) => {
        const value = new MetaplexInstructure.CreateMetadataArgs({ data, isMutable: true });
        return Buffer.from(serialize(MetaplexInstructure.SCHEMA, value));
    };
    MetaplexSerialize.serializeUpdateArgs = (data, newUpdateAuthority, primarySaleHappened) => {
        const value = new MetaplexInstructure.UpdateMetadataArgs({
            data,
            updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority.toString(),
            primarySaleHappened: primarySaleHappened === null || primarySaleHappened === undefined
                ? null
                : primarySaleHappened,
        });
        return Buffer.from(serialize(MetaplexInstructure.SCHEMA, value));
    };
    MetaplexSerialize.decode = (data) => {
        const decoded = deserializeUnchecked(MetaplexInstructure.SCHEMA, MetaplexInstructure.Metadata, data);
        const name = decoded.data.name.replace(REPLACE, '');
        const symbol = decoded.data.symbol.replace(REPLACE, '');
        const uri = decoded.data.uri.replace(REPLACE, '');
        /* tslint:disable-next-line */
        const update_authority = new PublicKey(decoded.updateAuthority).toBase58();
        /* tslint:disable-next-line */
        const seller_fee_basis_points = decoded.data.sellerFeeBasisPoints;
        // info: metaplex protocl is snake style parameter
        return {
            name,
            symbol,
            uri,
            update_authority,
            seller_fee_basis_points,
        };
    };
})(MetaplexSerialize || (MetaplexSerialize = {}));
