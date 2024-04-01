type KeypairState = {
  publicKey: string;
  secretKey: Uint8Array;
};

interface WithKeypairState {
  keypair: KeypairState;
}
