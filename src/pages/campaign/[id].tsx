import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "~/components/layout";
import {useEffect, useState} from "react";

export default function CampaignPage() {

  const handleContribute = async () => {
    const campaignId = router.query.id; // Get campaign ID from URL
    const res = await fetch(`/api/solana/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ campaignId: campaignId, amount: contributionAmount}),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    console.log(data)
    if (data.txhash) {
      setTxHash(data.txhash); // Set the transaction hash
      setShowAlert(true); // Show the alert
    }

    fetchCampaignInfo();
    // Handle response, e.g., show success message
  };

  const router = useRouter();
  const [campaignInfo, setCampaignInfo] = useState({}); // State to store campaign info
  const [contributionAmount, setContributionAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [txHash, setTxHash] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const fetchCampaignInfo = async () => {
    const campaignId = router.query.id; // Get campaign ID from URL
    const res = await fetch(`/api/solana/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ campaignId }),
    });
    const data = await res.json();
    setCampaignInfo(data); // Set campaign info in state
    const deadline = new Date(data.deadline * 1000); // Convert to milliseconds
    const now = new Date();
    //setTimeLeft(Math.max(deadline - now, 0));
    initializeCountdown(data.deadline);
  };

  const handlePayout = async () => {
    const campaignId = router.query.id; // Get campaign ID from URL
    const res = await fetch(`/api/solana/finalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ campaignId: campaignId}),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    console.log(data)

    if (data.txhash) {
      setTxHash(data.txhash); // Set the transaction hash
      setShowAlert(true); // Show the alert
    }

    fetchCampaignInfo();
    // Handle response, e.g., show success message
  };

  const hasDeadlinePassed = () => {
    const now = new Date();
    const deadline = new Date(campaignInfo.deadline * 1000);
    return now > deadline;
  };

  const initializeCountdown = (deadline) => {
    const deadlineDate = new Date(deadline * 1000); // Convert to milliseconds
    const now = new Date();
    setTimeLeft(Math.max(deadlineDate - now, 0));
  };

  useEffect(() => {
    // Function to fetch campaign info
    fetchCampaignInfo();
  }, [router.query.id]);

  useEffect(() => {
    // Update time left every second
    const interval = setInterval(() => {
      const now = new Date();
      setTimeLeft(prevTimeLeft => Math.max(prevTimeLeft - 1000, 0));
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const formatTimeLeft = (milliseconds) => {
    if (milliseconds <= 0) return '0';
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const filteredContributors = (campaignInfo.contributors || []).filter(contributor =>
      contributor.amount != 0
  ).sort((a, b) => {
    return b.contributedBalance - a.contributedBalance;
  });

  const images = [
    { url: "/openai-api.png", caption: "OpenAI API Key (0.1 SOL)" },
    { url: "/agi.png", caption: "GPT-5 (5 SOL)" },
  ];

  const isFirstImageGreyedOut = () => {
    // Convert totalContributed to SOL (assuming it's in Lamport)
    const totalContributedInSOL = campaignInfo.totalContributed / 1000000000;
    return totalContributedInSOL < 0.1;
  };

  return (
    <Layout>
      {showAlert && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-3" role="alert">
            <strong className="font-bold">Transaction Successful!</strong>
            <span className="block sm:inline"> Check the transaction </span>
            <a href={`https://explorer.solana.com/tx/${txHash}/?cluster=devnet`} className="underline" target="_blank" rel="noopener noreferrer">
              here!
            </a>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowAlert(false)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.859l-4.708-4.708 4.708-4.708a1.002 1.002 0 00-1.414-1.414L8.226 8.738l-4.708-4.708a1.002 1.002 0 10-1.414 1.414l4.708 4.708-4.708 4.708a1.002 1.002 0 101.414 1.414l4.708-4.708 4.708 4.708a1.002 1.002 0 001.414-1.414z"/>
            </svg>
          </span>
          </div>
      )}
      <section>
        <article className="grid grid-cols-2 gap-8 p-8">
          <Image
            className="rounded-2xl"
            src="/altman.webp"
            width={500}
            height={500}
            alt="Kampaign"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-bold text-4xl">Rent Money</h1>
            <p>You think crypto is turbolent? I invented AGI and still got fired! :(</p>
            <p>Willing to trade OpenAI API Keys!</p>
            {hasDeadlinePassed() ? (
                // Render Pay out button after deadline
                <button className="btn btn-success" onClick={handlePayout}>
                  Pay out
                </button>
            ) : (
                // Render Contribute button and input field before deadline
                <div className="flex gap-2 items-center">
                  <input
                      type="number"
                      placeholder="Contribution Amount"
                      className="input input-bordered"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                  />
                  <button className="btn" onClick={() => handleContribute()}>
                    Contribute
                  </button>
                </div>
            )}
            <p>Enter the amount in Lamport. Remember 1 SOL = 10^9 (100000000) Lamport.</p>
          </div>
        </article>
        <div className="grid grid-cols-3 py-8">
          <div className="text-center">
            <h2 className="text-2xl">{campaignInfo.totalContributed / 1000000000} SOL</h2>
            <p>Raised</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl">{campaignInfo.threshold / 1000000000} SOL</h2>
            <p>Goal</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl">{formatTimeLeft(timeLeft)}</h2>
            <p>Time left</p>
          </div>
        </div>
        <div className="card mx-8 border-2 border-base-content bg-base-100 shadow-xl">
          <h1 className="text-2xl text-center">Leaderboard</h1>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
              <tr>
                <th></th>
                <th>Public Key</th>
                <th>Amount Pledged (Lamport)</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {filteredContributors.map((contributor, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contributor.publicKey}</td>
                    <td>{contributor.contributedBalance}</td>
                    <td className="text-center">
                      <span className="badge badge-ghost badge-sm">Confirmed</span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card mx-8 my-4 border-2 border-base-content bg-base-100 shadow-xl">
          <div className="flex overflow-x-auto py-4" style={{ maxHeight: "300px" }}>
            {images.map((image, index) => (
                <div key={index} className={`flex-none w-60 mx-2 ${isFirstImageGreyedOut() && index === 0 ? 'opacity-10' : ''}`}>
                  <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-auto rounded" />
                  <p className="mt-2 text-center">{image.caption}</p>
                </div>
            ))}
          </div>
        </div>

      </section>
    </Layout>
  );
}
