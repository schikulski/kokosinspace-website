import { ReleaseForm } from "@/components/admin/ReleaseForm";
import { getBands } from "@/lib/db/queries";
import { createRelease } from "../actions";

export default async function NewReleasePage() {
  const bands = await getBands();
  return (
    <>
      <h1 className="adm-h1">New release</h1>
      <div className="adm-card">
        <ReleaseForm artists={bands.map((b) => b.name)} action={createRelease} />
      </div>
    </>
  );
}
