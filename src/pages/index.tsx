import Head from "next/head";
import { Layout } from "~/components/layout";
import Link from 'next/link';
import logo from "/public/logo_white.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Crowdlana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://cdn.discordapp.com/attachments/1171074422745075823/1175623121903030282/DALLE_2023-11-19_03.26.24_-_A_minimalistic_retrowave-style_cover_image_for_a_web3_crowdfunding_platform._The_image_features_a_simple_sleek_design_with_a_dark_background_and_neon.png?ex=656be75a&is=6559725a&hm=2d3e278f50cee974dfda040b81038321d17db1675f06c50277d99f77e433688b&)",
            }}
          >
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold" style={{color: "white"}}>Innovate and Elevate!</h1>
                <p className="mb-5 text-2xl" style={{color: "lightgrey"}}>The Future of Funding on Solana.</p>
                  <Link href="/create" className="btn m-2">
                      <button>Get paid right now →</button>
                  </Link>
                  <br/>
                  <Link href="/campaign" className="mx-2">
                      <button>or see what others are building →</button>
                  </Link>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
