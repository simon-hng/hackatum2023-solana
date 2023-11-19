import { Connection, PublicKey } from '@solana/web3.js';
import {AnchorProvider, BN, Program, Wallet, web3} from '@project-serum/anchor';
import idl from './idl.json';
import { Buffer } from 'buffer';
require('@solana/wallet-adapter-react-ui/styles.css');
const { Keypair } = web3;
const opts = {
    preflightCommitment: "processed"
}
const programID = new PublicKey("63EqqQAwr4ALGKmLtCnaKPiUvcytXjqu5iqMndqi3U76");

async function getProvider() {
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);
    const wallet = new Wallet(Keypair.generate())  // TODO: This should be user wallet once authorized
    const provider = new AnchorProvider(
        connection, wallet, opts.preflightCommitment,
    );
    return provider;
}

export default async function handler(req, res) {
    let campaignId = req.body.campaignId;
    if (campaignId === undefined || isNaN(Number(campaignId))) {
        campaignId = 1;
    }
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const [campaignAccountPk] = await web3.PublicKey.findProgramAddress(
        [Buffer.from("crowd-campaign-hackatum-23-7"), new Uint8Array([campaignId])],
        new PublicKey("63EqqQAwr4ALGKmLtCnaKPiUvcytXjqu5iqMndqi3U76")
    );
    const campaignAccount = await program.account.campaign.fetch(
        campaignAccountPk
    );
    const txHash = await program.methods
        .finalizeCampaign()
        .accounts({
            campaign: campaignAccountPk,
            claimer: provider.wallet.publicKey,
            clock: web3.SYSVAR_CLOCK_PUBKEY
        })
        .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
    // Confirm transaction
    await provider.connection.confirmTransaction(txHash);
    res.status(200).json({txhash: txHash});
}
