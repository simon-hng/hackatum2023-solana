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
    let secretKey = Uint8Array.from([
        39,17,210,104,241,14,93,24,77,238,66,239,54,175,82,255,156,69,207,22,149,110,126,148,40,123,81,231,134,200,227,75,34,10,61,202,206,212,174,63,128,111,61,57,172,211,138,203,201,104,93,184,253,195,61,41,140,238,197,205,148,74,186,7
    ]);
    const keys = Keypair.fromSecretKey(secretKey)
    const wallet = new Wallet(keys)  // TODO: This should be user wallet once authorized
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
    let threshold = req.body.threshold;
    if (threshold === undefined || isNaN(Number(threshold))) {
        threshold = 500000000;
    }
    let runtime = req.body.runtime;
    if (runtime === undefined || isNaN(Number(runtime))) {
        runtime = 120;
    }
    console.log("Creating campaign with runtime ", runtime)
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const [campaignAccountPk] = await web3.PublicKey.findProgramAddress(
        [Buffer.from("crowd-campaign-hackatum-23-7"), new Uint8Array([campaignId])],
        new PublicKey("63EqqQAwr4ALGKmLtCnaKPiUvcytXjqu5iqMndqi3U76")
    );
    const txHash = await program.methods
        .initCampaign(campaignId, new BN(threshold), new BN(Math.floor(Date.now()/1000) + 120)) // CampaignId, Threshold, Deadline (in 5 minutes)
        .accounts({
            campaign: campaignAccountPk,
            owner: provider.wallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
    await provider.connection.confirmTransaction(txHash);
    console.log("Initialized campaign with id ", campaignId);
    res.status(200).json({txhash: txHash});
}
