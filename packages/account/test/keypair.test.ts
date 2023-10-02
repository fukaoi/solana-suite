import test from "ava";
import { Keypair, PublicKey } from "@solana/web3.js";
import { KeypairAccount } from "../src/keypair-account";
import bs from "bs58";
import "global";

const PUBKEY = "6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5";
const SECRET =
  "5K8YJqfs8Zs6fkRK9UyuX1TvSchofkwodQHciDpmw3zzEE3Tkiuyg6jes2FtmvQNETafE5tqfrb7ssYUMmEggWwF";

test("Pubkey to PublicKey", (t) => {
  const res = PUBKEY.toPublicKey();
  t.deepEqual(res, new PublicKey(PUBKEY));
});

test("Secret to SecretKey", (t) => {
  const res = SECRET.toKeypair();
  t.deepEqual(res, Keypair.fromSecretKey(bs.decode(SECRET)));
});

test("Failed convert string to PublicKey", (t) => {
  const error = t.throws(() => {
    "failed-publickey".toPublicKey();
  });
  t.not(error, undefined);
});

test("Failed convert string to SecretKey", (t) => {
  const error = t.throws(() => {
    "failed-secretKey".toKeypair();
  });
  t.not(error, undefined);
});

test("Create KeyPair Object", async (t) => {
  const obj = new KeypairAccount({ pubkey: PUBKEY, secret: SECRET });
  t.not(obj, undefined);
});

test("is Pubkey", async (t) => {
  for (let index = 0; index < 50; index++) {
    t.true(KeypairAccount.isPubkey(KeypairAccount.create().pubkey));
  }
});

test("is Secret", async (t) => {
  for (let index = 0; index < 50; index++) {
    t.true(KeypairAccount.isSecret(KeypairAccount.create().secret));
  }
});

test("Keypair to KeyPair", async (t) => {
  const keypair = Keypair.generate();
  const expeted = {
    pubkey: keypair.publicKey.toString(),
    secret: bs.encode(keypair.secretKey).toString(),
  };
  const res = KeypairAccount.toKeyPair(keypair);
  t.like(res, expeted);
});
