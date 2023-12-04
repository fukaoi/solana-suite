export namespace Transaction {
  /**
   * @param tx a solana transaction
   * @param feePayer the publicKey of the signer
   * @returns size in bytes of the transaction
   */
  export const getTxSize = (tx: Tx, feePayer: PublicKey): number => {
    const feePayerPk = [feePayer.toBase58()];

    const signers = new Set<string>(feePayerPk);
    const accounts = new Set<string>(feePayerPk);

    const ixsSize = tx.instructions.reduce((acc, ix) => {
      ix.keys.forEach(({ pubkey, isSigner }) => {
        const pk = pubkey.toBase58();
        if (isSigner) signers.add(pk);
        accounts.add(pk);
      });

      accounts.add(ix.programId.toBase58());

      const nIndexes = ix.keys.length;
      const opaqueData = ix.data.length;

      return (
        acc +
        1 + // PID index
        compactArraySize(nIndexes, 1) +
        compactArraySize(opaqueData, 1)
      );
    }, 0);

    return (
      compactArraySize(signers.size, 64) + // signatures
      3 + // header
      compactArraySize(accounts.size, 32) + // accounts
      32 + // blockhash
      compactHeader(tx.instructions.length) + // instructions
      ixsSize
    );
  };

  // COMPACT ARRAY

  const LOW_VALUE = 127; // 0x7f
  const HIGH_VALUE = 16383; // 0x3fff

  /**
   * Compact u16 array header size
   * @param n elements in the compact array
   * @returns size in bytes of array header
   */
  const compactHeader = (n: number) =>
    n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;

  /**
   * Compact u16 array size
   * @param n elements in the compact array
   * @param size bytes per each element
   * @returns size in bytes of array
   */
  const compactArraySize = (n: number, size: number) =>
    compactHeader(n) + n * size;
}
