declare global {
  interface String {
    toExplorerUrl(explorer?: Explorer): string;
  }
}
export enum Explorer {
  Solscan = 'solscan',
  SolanaFM = 'solanafm',
}
