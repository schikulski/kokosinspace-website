import { getTexts } from "@/lib/db/queries";
import { TextsForm } from "@/components/admin/TextsForm";

export default async function AdminText() {
  const texts = await getTexts();
  return (
    <>
      <h1 className="adm-h1">Site text</h1>
      <p className="adm-hint">
        Every piece of text on the site. Empty a field to go back to the original text (shown greyed out in the empty field).
        Band names, blurbs and release titles are edited on each band and release.
      </p>
      <TextsForm texts={texts} />
    </>
  );
}
