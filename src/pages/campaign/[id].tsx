import { useRouter } from "next/router";
import Image from "next/image";

export default function CampaignPage() {
  const router = useRouter();
  return (
    <section>
      <article className="grid grid-cols-2 gap-8 p-8">
        <Image
          className="rounded-2xl"
          src="/campaign.png"
          width={500}
          height={500}
          alt="Kampaign"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-bold text-4xl">Large Title</h1>
          <p>Lorem ipsum {router.query.id}</p>
          <button className="btn">Contribute</button>
        </div>
      </article>
      <div className="grid grid-cols-3 py-8">
        <div className="text-center">
          <h2 className="text-2xl">$900</h2>
          <p>Raised</p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl">$9000</h2>
          <p>Goal</p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl">2 Days</h2>
          <p>Time left</p>
        </div>
      </div>

      <div className="card mx-8 border-2 border-base-content bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount Pledged</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://i.pravatar.cc/150?img=8"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  $800
                  <br />
                  <span className="badge badge-ghost badge-sm">Solana</span>
                </td>
                <th>
                  <button className="btn btn-success">TX Received</button>
                </th>
              </tr>
              {/* row 2 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://i.pravatar.cc/150?img=2"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Brice Swyre</div>
                      <div className="text-sm opacity-50">China</div>
                    </div>
                  </div>
                </td>
                <td>
                  $300
                  <br />
                  <span className="badge badge-ghost badge-sm">Solana</span>
                </td>
                <th>
                  <button className="btn btn-success">TX Received</button>
                </th>
              </tr>
              {/* row 3 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Marjy Ferencz</div>
                      <div className="text-sm opacity-50">Russia</div>
                    </div>
                  </div>
                </td>
                <td>
                  $400
                  <br />
                  <span className="badge badge-ghost badge-sm">Solana</span>
                </td>
                <th>
                  <button className="btn btn-success">TX Received</button>
                </th>
              </tr>
              {/* row 4 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://i.pravatar.cc/150?img=4"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Yancy Tear</div>
                      <div className="text-sm opacity-50">Brazil</div>
                    </div>
                  </div>
                </td>
                <td>
                  $400
                  <br />
                  <span className="badge badge-ghost badge-sm">Solana</span>
                </td>
                <th>
                  <button className="btn btn-success">TX Received</button>
                </th>
              </tr>
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount Pledged</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}