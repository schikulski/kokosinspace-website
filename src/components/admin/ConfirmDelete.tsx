"use client";

export function ConfirmDelete({ action, id, label }: { action: (fd: FormData) => Promise<void>; id: number; label: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(label)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="adm-btn adm-btn--danger">Delete</button>
    </form>
  );
}
