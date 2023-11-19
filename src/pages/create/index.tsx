import { Layout } from "~/components/layout";

export default function CampaignsPage() {
  return (
    <Layout>
      <section className="m-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 p-4">
          <div className="form-control w-full">
            <h2 className="card-title">Settings</h2>
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <div className="form-controf">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-64 w-full"
                placeholder="Bio"
              ></textarea>
            </div>

            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full"
            />
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
