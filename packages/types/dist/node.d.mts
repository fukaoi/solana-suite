declare global {
    interface String {
        toExplorerUrl(explorer?: Explorer): string;
    }
}
declare enum Explorer {
    Solscan = "solscan",
    SolanaFM = "solanafm"
}

export { Explorer };
