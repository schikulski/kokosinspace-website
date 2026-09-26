import { BandForm } from "@/components/admin/BandForm";
import { createBand } from "../actions";

export default function NewBandPage() {
  return (
    <>
      <h1 className="adm-h1">New band</h1>
      <div className="adm-card">
        <BandForm action={createBand} />
      </div>
    </>
  );
}
