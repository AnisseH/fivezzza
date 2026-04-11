import type { APIContext } from 'astro';

export const prerender = false;

export async function POST(context: APIContext): Promise<Response> {
  const db = context.locals.runtime.env.DB;
  const form = await context.request.formData();

  const redirect = (path: string) =>
    new Response(null, { status: 303, headers: { Location: path } });

  const fail = (msg: string) =>
    redirect(`/admin/hours?error=${encodeURIComponent(msg)}`);

  try {
    const ids         = form.getAll('ids')         as string[];
    const day_labels  = form.getAll('day_labels')  as string[];
    const time_ranges = form.getAll('time_ranges') as string[];
    const sort_orders = form.getAll('sort_orders') as string[];

    if (day_labels.length === 0) return fail('Aucune ligne soumise');
    if (day_labels.length !== time_ranges.length) return fail('Données incohérentes');

    // Fetch current IDs to detect deletions
    const existing = await db.prepare('SELECT id FROM hours').all<{ id: number }>();
    const submittedIds = new Set(ids.filter(Boolean).map(Number));
    const toDelete = existing.results.map(r => r.id).filter(id => !submittedIds.has(id));

    const statements: D1PreparedStatement[] = [];

    for (let i = 0; i < day_labels.length; i++) {
      const day = day_labels[i].trim();
      const time = time_ranges[i].trim();
      const sort = parseInt(sort_orders[i], 10) || i + 1;
      const id = ids[i];

      if (!day || !time) return fail('Jour et horaires obligatoires');

      if (id) {
        statements.push(
          db.prepare('UPDATE hours SET day_label = ?, time_range = ?, sort_order = ? WHERE id = ?')
            .bind(day, time, sort, parseInt(id, 10))
        );
      } else {
        statements.push(
          db.prepare('INSERT INTO hours (day_label, time_range, sort_order) VALUES (?, ?, ?)')
            .bind(day, time, sort)
        );
      }
    }

    for (const id of toDelete) {
      statements.push(db.prepare('DELETE FROM hours WHERE id = ?').bind(id));
    }

    if (statements.length > 0) {
      await db.batch(statements);
    }

    return redirect('/admin/hours?ok=1');
  } catch (e) {
    console.error('admin/api/hours error:', e);
    return fail('Erreur serveur');
  }
}
