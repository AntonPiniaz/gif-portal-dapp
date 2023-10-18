import { web3 } from '@project-serum/anchor';
import keypair from 'src/scripts/keypair.json';
import { getConfig } from './utils';

const { SystemProgram } = web3;
const { provider, program } = getConfig();
const arr = Object.values(keypair._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

export const getGifList = async () => {
  try {
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    return account.gifList;
  } catch (error) {
    throw new Error(error);
  }
};

export const createGifAccount = async () => {
  try {
    await program.methods
      .start()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        SystemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    console.log(
      'Created a new BaseAccount with address:',
      baseAccount.publicKey.toString()
    );
  } catch (error) {
    console.error('Error creating BaseAccount:', error);
  }
};

export const sendGif = async (link) => {
  try {
    await program.methods
      .addGif(link)
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();

    console.log('GIF added successfully');
  } catch (error) {
    throw new Error(error);
  }
};
