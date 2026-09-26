import { ROTATIONS } from "@/lib/site";

export function RotateSelect({ name, label, value }: { name: string; label: string; value: string }) {
  const options = ROTATIONS.includes(value) ? ROTATIONS : [value, ...ROTATIONS];
  return (
    <label className="adm-field">
      <span className="adm-label">{label}</span>
      <select name={name} defaultValue={value} className="adm-select">
        {options.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </label>
  );
}
