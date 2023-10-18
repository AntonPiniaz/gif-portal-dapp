const anchor = require('@project-serum/anchor');
const { assert } = require('chai');

const { SystemProgram } = anchor.web3;

describe('gif-portal-dapp', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.GifPortalDapp;
  const programProvider = program.provider;
  baseAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    await program.methods
      .start()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: programProvider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    const fetchedAccount = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    assert.equal(
      fetchedAccount.totalGifs.toNumber(),
      0,
      'totalGifs was not initialized correctly'
    );
  });

  it('Add new Gif', async () => {
    await program.methods
      .addGif('https://media.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif')
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: programProvider.wallet.publicKey,
      })
      .rpc();

    const fetchedAccount = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    assert.equal(
      fetchedAccount.totalGifs.toNumber(),
      1,
      'totalGifs was not added correctly'
    );
    assert.equal(
      fetchedAccount.gifList.length,
      1,
      'gif list was not filled correctly'
    );
  });
});
