import { Layout } from "~/components/layout";
import { useState } from 'react';


export default function CampaignsPage() {
  const [campaignId, setCampaignId] = useState('');
  const [threshold, setThreshold] = useState('');
  const [runtime, setRuntime] = useState('');
  const [txHash, setTxHash] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const handleInitialize = async () => {
    // Replace with the actual endpoint or smart contract interaction logic
    const res = await fetch(`/api/solana/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ campaignId, threshold, runtime }),
    });
    const data = await res.json();

    if (data.txhash) {
      setTxHash(data.txhash); // Set the transaction hash
      setShowAlert(true); // Show the alert
    }
    // Handle the response, e.g., show success message or error
    console.log(data);
  };


  return (
    <Layout>
      {showAlert && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-3" role="alert">
            <strong className="font-bold">Transaction Successful!</strong>
            <span className="block sm:inline"> Check the transaction </span>
            <a href={`https://explorer.solana.com/tx/${txHash}/?cluster=devnet`} className="underline" target="_blank" rel="noopener noreferrer">
              here
            </a>
            <span className="block sm:inline"> and the campaign page </span>
            <a href={`https://crowdlana.pro/campaign/${campaignId}`} className="underline" target="_blank" rel="noopener noreferrer">
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
      <section className="m-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 p-4">
          <div className="form-control w-full">
            <h2 className="card-title">Settings</h2>
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <label className="label">
              <span className="label-text">Campaign ID</span>
            </label>
            <input
                type="number"
                placeholder="Enter campaign ID"
                className="input input-bordered w-full"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
            />

            <label className="label">
              <span className="label-text">Threshold (in Lamports)</span>
            </label>
            <input
                type="number"
                placeholder="Enter threshold"
                className="input input-bordered w-full"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
            />

            <label className="label">
              <span className="label-text">Runtime (in seconds)</span>
            </label>
            <input
                type="number"
                placeholder="Enter runtime"
                className="input input-bordered w-full"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
            />

            <button className="btn btn-primary mt-4" onClick={handleInitialize}>Initialize Campaign</button>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h2 className="card-title ml-8">Milestones</h2>
          {[...Array(3)].map(() => (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <input
                  type="text"
                  placeholder="Set some milestones!"
                  className="input input-bordered w-full"
                />

                <div className="form-controf">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Bio"
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
