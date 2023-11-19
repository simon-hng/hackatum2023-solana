import { faker } from "@faker-js/faker";
import Link from "next/link";
import { Layout } from "~/components/layout";

export default function CampaignsPage() {
  return (
    <Layout>
      <section className="m-8 grid grid-cols-3 gap-4">
        {[...Array(10)].map((_, i) => (
          <Link href="/campaign/53">
            <div className="card w-full overflow-hidden rounded-2xl bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-full"
                  src={faker.image.urlLoremFlickr({
                    width: 400,
                    height: 300,
                    category: "business",
                  })}
                  alt="Blockchain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {faker.lorem.words(2)}
                  {i == 0 && <div className="badge badge-secondary">NEW</div>}
                </h2>
                <p>{faker.lorem.words(24)}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Climate</div>
                  <div className="badge badge-outline">Social Impact</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
