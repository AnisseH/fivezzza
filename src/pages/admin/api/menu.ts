import type { APIContext } from 'astro';

export const prerender = false;

export async function POST(context: APIContext): Promise<Response> {
  const db = context.locals.runtime.env.DB;
  const form = await context.request.formData();
  const action = form.get('action') as string;

  const redirect = (path: string) =>
    new Response(null, { status: 303, headers: { Location: path } });

  const fail = (msg: string) =>
    redirect(`/admin/menu?error=${encodeURIComponent(msg)}`);

  const ok = () => redirect('/admin/menu?ok=1');

  try {
    switch (action) {

      // ── Categories ──────────────────────────────────────────────────────────

      case 'add_category': {
        const id = (form.get('id') as string)?.trim();
        const name = (form.get('name') as string)?.trim();
        const sort_order = parseInt(form.get('sort_order') as string, 10) || 1;
        if (!id || !name) return fail('Champs obligatoires manquants');
        if (!/^[a-z0-9_-]+$/.test(id)) return fail('Identifiant invalide');
        await db.prepare('INSERT INTO categories (id, name, sort_order) VALUES (?, ?, ?)')
          .bind(id, name, sort_order).run();
        return ok();
      }

      case 'update_category': {
        const id = (form.get('id') as string)?.trim();
        const name = (form.get('name') as string)?.trim();
        const sort_order = parseInt(form.get('sort_order') as string, 10) || 1;
        if (!id || !name) return fail('Champs obligatoires manquants');
        await db.prepare('UPDATE categories SET name = ?, sort_order = ? WHERE id = ?')
          .bind(name, sort_order, id).run();
        return ok();
      }

      case 'delete_category': {
        const id = (form.get('id') as string)?.trim();
        if (!id) return fail('Identifiant manquant');
        await db.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();
        return ok();
      }

      // ── Menu items ──────────────────────────────────────────────────────────

      case 'add_item': {
        const category_id = (form.get('category_id') as string)?.trim();
        const name = (form.get('name') as string)?.trim();
        const description = (form.get('description') as string)?.trim() ?? '';
        const price = parseFloat(form.get('price') as string);
        const sort_order = parseInt(form.get('sort_order') as string, 10) || 1;
        if (!category_id || !name || isNaN(price) || price < 0) return fail('Champs obligatoires manquants ou prix invalide');
        await db.prepare(
          'INSERT INTO menu_items (category_id, name, description, price, sort_order) VALUES (?, ?, ?, ?, ?)'
        ).bind(category_id, name, description, price, sort_order).run();
        return ok();
      }

      case 'update_item': {
        const id = parseInt(form.get('id') as string, 10);
        const name = (form.get('name') as string)?.trim();
        const description = (form.get('description') as string)?.trim() ?? '';
        const price = parseFloat(form.get('price') as string);
        const sort_order = parseInt(form.get('sort_order') as string, 10) || 1;
        if (!id || !name || isNaN(price) || price < 0) return fail('Champs obligatoires manquants ou prix invalide');
        await db.prepare(
          'UPDATE menu_items SET name = ?, description = ?, price = ?, sort_order = ? WHERE id = ?'
        ).bind(name, description, price, sort_order, id).run();
        return ok();
      }

      case 'delete_item': {
        const id = parseInt(form.get('id') as string, 10);
        if (!id) return fail('Identifiant manquant');
        await db.prepare('DELETE FROM menu_items WHERE id = ?').bind(id).run();
        return ok();
      }

      // ── Supplements ─────────────────────────────────────────────────────────

      case 'add_supplement': {
        const category_id = (form.get('category_id') as string)?.trim();
        const label = (form.get('label') as string)?.trim();
        const detail = (form.get('detail') as string)?.trim() ?? '';
        const price = parseFloat(form.get('price') as string);
        if (!category_id || !label || isNaN(price) || price < 0) return fail('Champs obligatoires manquants');
        await db.prepare(
          'INSERT INTO supplements (category_id, label, detail, price) VALUES (?, ?, ?, ?)'
        ).bind(category_id, label, detail, price).run();
        return ok();
      }

      case 'update_supplement': {
        const id = parseInt(form.get('id') as string, 10);
        const label = (form.get('label') as string)?.trim();
        const detail = (form.get('detail') as string)?.trim() ?? '';
        const price = parseFloat(form.get('price') as string);
        if (!id || !label || isNaN(price) || price < 0) return fail('Champs obligatoires manquants');
        await db.prepare(
          'UPDATE supplements SET label = ?, detail = ?, price = ? WHERE id = ?'
        ).bind(label, detail, price, id).run();
        return ok();
      }

      case 'delete_supplement': {
        const id = parseInt(form.get('id') as string, 10);
        if (!id) return fail('Identifiant manquant');
        await db.prepare('DELETE FROM supplements WHERE id = ?').bind(id).run();
        return ok();
      }

      default:
        return fail('Action inconnue');
    }
  } catch (e) {
    console.error('admin/api/menu error:', e);
    return fail('Erreur serveur');
  }
}
