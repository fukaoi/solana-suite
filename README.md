<img src="https://bafkreibksjy2sdskvcrrlse2lwbskasub36bspidube7rlozhrd7wssg6i.ipfs.nftstorage.link/" width="75%" height="75%" />

<br />

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![npm version](https://badge.fury.io/js/@solana-suite%2Fcore.png)](https://badge.fury.io/js/@solana-suite%2Fcore)
![compile workflow](https://github.com/atonoy/solana-suite/actions/workflows/compile.yml/badge.svg)
![lint workflow](https://github.com/atonoy/solana-suite/actions/workflows/lint.yml/badge.svg)
<br />

# Summary


:star:
Solana suite is a convenience package for developing the Solana ecosystem. Using it will speed up your development.Include @solana/web3.js, @solana/spl-token, Metaplex api, Storage api(nft.storage/arweave), Phantom wallet api.
By using Solana Suite allows for rapid development of blockchain products.

<img src="https://bafkreibolz2wpbpamryvdlcmbqfrit2wyvpx3ayyrjplth2s32ugp5uk2m.ipfs.nftstorage.link/" width="95%" height="95%" />

(* Architecture image)


:star:
Compared to using web3.js alone, the amount of source code is , allowing you to focus on what you want to do with Solana.Web engineers with little blockchain development experience and no Solana Dapps development experience can learn quickly.

<img src="https://bafybeifakfjcqm5yovpgayes7lkqzr4xfthccbvhlql6no24nmnm4lydre.ipfs.nftstorage.link/" width="95%" height="95%" />

(* A sample code in this image compares the source code for writing memo data to a transaction)


# Motivation
Solana is a flexible, versatile, and wonderful blockchain. However, it backfires and makes it difficult to quickly develop what you want to do. We aim to make it easy for engineers who are not familiar with solana to develop with less source code

# Features
### Easy to use all in package
>Create wallet, Transfer SOL/SPL-TOKEN, Mint SPL-TOKEN/NFT, Upload
storage(nft.storage/arweave), Connect phantom wallet,,,,

### Both Node.js and Browser does one code
>No need to change source code in Node.js and Browser js. There is no need to be aware of
the environment in which the calling program will run.It is useful for building most Solana
blockchain services because it provides a variety of functions as a single library, including

### Response handling using Result type
>It does not suddenly stop programs using solana-suite by throwing an Exception when
an error occurs. Traditional try-catch is not necessary.

### Various search options
>Limit/Order, Source/Destination filter, Search address(include token account), Action
filter(action type: Transfer, Mint, CreateAccount,,,,,)

### Multiple transaction support
>Multiple instructions can be grouped together and executed as a single transaction.
This makes it easy to implement batch processing. Also, by combining them into a
single transaction, unnecessary access to the RPC server can be avoided.

### Multisig support 
>We support multisig as much as possible, transfer, mint SPL-TOKEN, making memos


# Official Page
:house: https://atonoy.github.io/solana-suite/

# Docs
:books: https://solana-suite.gitbook.io/solana-suite-develpoment-guide/

