import { notFound } from "next/navigation";
import { BandForm } from "@/components/admin/BandForm";
import { getBand } from "@/lib/db/queries";
import { updateBand } from "../actions";

export default async function EditBandPage({ params }: PageProps<"/admin/bands/[id]">) {
  const { id } = await params;
  const band = Number.isInteger(Number(id)) ? await getBand(Number(id)) : null;
  if (!band) notFound();
  const action = updateBand.bind(null, band.id);
  return (
    <>
      <h1 className="adm-h1">Edit band</h1>
      <div className="adm-card">
        <BandForm band={band} action={action} />
      </div>
    </>
  );
}
