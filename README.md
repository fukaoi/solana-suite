![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![npm version](https://badge.fury.io/js/@solana-suite%2Fcore.png)](https://badge.fury.io/js/@solana-suite%2Fcore)
![compile workflow](https://github.com/atonoy/solana-suite/actions/workflows/compile.yml/badge.svg)
![lint workflow](https://github.com/atonoy/solana-suite/actions/workflows/lint.yml/badge.svg)
![PR](https://img.shields.io/badge/PRs-welcome-orange)
[![code-style-prettier][code-style-prettier-image]][code-style-prettier-url]

[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-prettier-url]: https://github.com/prettier/prettier

## What is Solana Suite?

Solana Suite is an SDK for Newbies. Even if you are not familiar with Solana or
blockchain, you can create blockchain services by simply calling functions while
referring to the documentation.

## Why is Solana Suite create?

There aren't enough blockchain engineers, but there are plenty of Web2.0
engineers. I thought if we could train these Web2.0 engineers, we might be able
to fill the gap in blockchain talent.

I wanted more people to know about the amazing features of Solana. Solana has a
special design that makes it different from other blockchains, making it a bit
hard to grasp. I believed that if there was an SDK that didn't require knowing
all the details of Solana, more people could use it.

## Architecture Design

In Solana Suite, we do not wrap well-known libraries such as solana/web3.js and
the Metaplex JS library. Instead, interactions are generated directly from the
programs' instructions. This unique architecture allows for cost-effective fee
management and the implementation of convenient functions within the programs.

<p align="center">
  <img src="https://github.com/atonoy/solana-suite/assets/186659/d27c5c74-60ec-4f5d-8cda-8888fcccf728">
</p>


## Contents

### Official Page

<https://www.solana-suite.org>

### Docs

<https://docs.solana-suite.org>

### Api reference

<https://api-reference.solana-suite.org>
