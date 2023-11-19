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
    let responseData = {
        campaignId: Number(campaignAccount.campaignId),
        totalContributed: Number(campaignAccount.totalContributed),
        threshold: Number(campaignAccount.threshold),
        timeRemaining: Number(campaignAccount.deadline) - Math.floor(Date.now() / 1000),
        deadline: Number(campaignAccount.deadline),
        currentTimestamp: Math.floor(Date.now() / 100),
        contributors: []
    };

    for (let i = 0; i < campaignAccount.contributorPks.length; i++) {
        let privateKey = campaignAccount.contributorPks[i];
        let contributedBalanceBN = campaignAccount.contributionAmounts[i];
        let contributedBalance = contributedBalanceBN.toString(10);
        responseData.contributors.push({
            publicKey: privateKey,
            contributedBalance: contributedBalance
        });
    }

    res.status(200).json(responseData);
}
