import Link from "next/link";
import { getBands, getReleases } from "@/lib/db/queries";
import { deleteBand, moveBand } from "./bands/actions";
import { deleteRelease, moveRelease } from "./releases/actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

export default async function AdminHome() {
  const [bands, releases] = await Promise.all([getBands(), getReleases()]);

  return (
    <>
      <h1 className="adm-h1">Label control room</h1>

      <section id="bands" className="adm-section">
        <div className="adm-section-head">
          <h2 className="adm-h2">Bands</h2>
          <Link href="/admin/bands/new" className="adm-btn adm-btn--primary">
            + Add band
          </Link>
        </div>
        <div className="adm-card">
          {bands.length === 0 ? (
            <p className="adm-empty">No bands yet. Add the first one.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Links</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bands.map((b, i) => (
                  <tr key={b.id}>
                    <td>
                      {b.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.photoUrl} alt="" className="adm-thumb" />
                      ) : (
                        <div className="adm-thumb" />
                      )}
                    </td>
                    <td>
                      <strong>{b.name}</strong>
                      <br />
                      <span className="adm-hint">{b.blurb}</span>
                    </td>
                    <td className="adm-hint">
                      {[b.instagram && "Instagram", b.spotify && "Spotify", b.bandcamp && "Bandcamp"].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td>
                      <div className="adm-actions">
                        <form action={moveBand}>
                          <input type="hidden" name="id" value={b.id} />
                          <input type="hidden" name="dir" value="up" />
                          <button className="adm-btn adm-btn--icon" disabled={i === 0} aria-label="Move up">
                            ↑
                          </button>
                        </form>
                        <form action={moveBand}>
                          <input type="hidden" name="id" value={b.id} />
                          <input type="hidden" name="dir" value="down" />
                          <button className="adm-btn adm-btn--icon" disabled={i === bands.length - 1} aria-label="Move down">
                            ↓
                          </button>
                        </form>
                        <Link href={`/admin/bands/${b.id}`} className="adm-btn adm-btn--teal">
                          Edit
                        </Link>
                        <ConfirmDelete action={deleteBand} id={b.id} label={`Delete ${b.name}?`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section id="releases" className="adm-section">
        <div className="adm-section-head">
          <h2 className="adm-h2">Releases</h2>
          <Link href="/admin/releases/new" className="adm-btn adm-btn--primary">
            + Add release
          </Link>
        </div>
        <div className="adm-card">
          {releases.length === 0 ? (
            <p className="adm-empty">No releases yet.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Year</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {releases.map((r, i) => (
                  <tr key={r.id}>
                    <td>
                      {r.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.coverUrl} alt="" className="adm-thumb adm-thumb--sq" />
                      ) : (
                        <div className="adm-thumb adm-thumb--sq" />
                      )}
                    </td>
                    <td>
                      <strong>{r.title}</strong>
                      {r.url ? (
                        <>
                          <br />
                          <a href={r.url} target="_blank" rel="noopener" className="adm-hint">
                            {r.url}
                          </a>
                        </>
                      ) : null}
                    </td>
                    <td>{r.artist}</td>
                    <td>{r.year || "—"}</td>
                    <td>
                      <div className="adm-actions">
                        <form action={moveRelease}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="dir" value="up" />
                          <button className="adm-btn adm-btn--icon" disabled={i === 0} aria-label="Move up">
                            ↑
                          </button>
                        </form>
                        <form action={moveRelease}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="dir" value="down" />
                          <button className="adm-btn adm-btn--icon" disabled={i === releases.length - 1} aria-label="Move down">
                            ↓
                          </button>
                        </form>
                        <Link href={`/admin/releases/${r.id}`} className="adm-btn adm-btn--teal">
                          Edit
                        </Link>
                        <ConfirmDelete action={deleteRelease} id={r.id} label={`Delete ${r.title}?`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
