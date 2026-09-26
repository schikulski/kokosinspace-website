import Link from "next/link";
import { getBands, getHeroImages, getReleases } from "@/lib/db/queries";
import { deleteBand, moveBand } from "./bands/actions";
import { addHeroImage, deleteHeroImage, moveHeroImage } from "./hero/actions";
import { deleteRelease, moveRelease } from "./releases/actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { HeroImageForm } from "@/components/admin/HeroImageForm";

export default async function AdminHome() {
  const [bands, releases, hero] = await Promise.all([getBands(), getReleases(), getHeroImages()]);

  return (
    <>
      <h1 className="adm-h1">Label control room</h1>

      <section id="hero" className="adm-section">
        <div className="adm-section-head">
          <h2 className="adm-h2">Hero photos</h2>
          <span className="adm-hint">The taped-on photo at the top of the page. Several photos fade through in this order.</span>
        </div>
        <div className="adm-card">
          {hero.length === 0 ? (
            <p className="adm-empty">No photos yet, the site shows the default Sad Chloe photo.</p>
          ) : (
            <div className="adm-hero-grid">
              {hero.map((h, i) => (
                <figure key={h.id} className="adm-hero-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={h.url} alt={h.alt} className="adm-hero-thumb" />
                  <figcaption className="adm-hint">{h.alt || "(no alt text)"}</figcaption>
                  <div className="adm-actions adm-actions--left">
                    <form action={moveHeroImage}>
                      <input type="hidden" name="id" value={h.id} />
                      <input type="hidden" name="dir" value="up" />
                      <button className="adm-btn adm-btn--icon" disabled={i === 0} aria-label="Move earlier">
                        ←
                      </button>
                    </form>
                    <form action={moveHeroImage}>
                      <input type="hidden" name="id" value={h.id} />
                      <input type="hidden" name="dir" value="down" />
                      <button className="adm-btn adm-btn--icon" disabled={i === hero.length - 1} aria-label="Move later">
                        →
                      </button>
                    </form>
                    <ConfirmDelete action={deleteHeroImage} id={h.id} label="Remove this photo from the rotation?" />
                  </div>
                </figure>
              ))}
            </div>
          )}
          <hr className="adm-hr" />
          <HeroImageForm action={addHeroImage} />
        </div>
      </section>

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
