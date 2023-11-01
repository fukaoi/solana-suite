module.exports = {
  extensions: {
    ts: "module",
  },
  nodeArguments: ["--loader=tsx", "--no-warnings"],
  // concureency: 5,
  verbose: false,
  serial: true,
  timeout: "30m",
};
