import { notFound } from "next/navigation";
import { ReleaseForm } from "@/components/admin/ReleaseForm";
import { getBands, getRelease } from "@/lib/db/queries";
import { updateRelease } from "../actions";

export default async function EditReleasePage({ params }: PageProps<"/admin/releases/[id]">) {
  const { id } = await params;
  const [release, bands] = await Promise.all([Number.isInteger(Number(id)) ? getRelease(Number(id)) : null, getBands()]);
  if (!release) notFound();
  const action = updateRelease.bind(null, release.id);
  return (
    <>
      <h1 className="adm-h1">Edit release</h1>
      <div className="adm-card">
        <ReleaseForm release={release} artists={bands.map((b) => b.name)} action={action} />
      </div>
    </>
  );
}
