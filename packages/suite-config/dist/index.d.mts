declare namespace Config {
    const JSON_FILE_NAME = "solana-suite.json";
    /**
     * Search  file path for solana-suite.json
     * @param {string} dir
     * @returns {string | undefined}
     */
    const searchConfigJson: (dir: string) => string | undefined;
}

export { Config };
