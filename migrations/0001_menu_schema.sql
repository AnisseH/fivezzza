-- ─── Schema ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS categories (
  id         TEXT    PRIMARY KEY,
  name       TEXT    NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS menu_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id TEXT    NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name        TEXT    NOT NULL,
  description TEXT    NOT NULL DEFAULT '',
  price       REAL    NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- One optional supplement row per category (e.g. "Suppléments – ½ burrata ou jambon – 3€")
CREATE TABLE IF NOT EXISTS supplements (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id TEXT    NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  label       TEXT    NOT NULL,
  detail      TEXT    NOT NULL DEFAULT '',
  price       REAL    NOT NULL
);

CREATE TABLE IF NOT EXISTS hours (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  day_label  TEXT    NOT NULL,
  time_range TEXT    NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ─── Seed data ────────────────────────────────────────────────────────────────

INSERT INTO categories (id, name, sort_order) VALUES
  ('pizza',     'Pizza',     1),
  ('antipasti', 'Antipasti', 2),
  ('dessert',   'Dessert',   3);

INSERT INTO menu_items (category_id, name, description, price, sort_order) VALUES
  ('pizza', 'Margherita',
   'Tomate, mozzarella fior di latte, pecorino romano, basilic',
   10, 1),
  ('pizza', 'Végé',
   'Tomate, mozzarella fior di latte, légumes du moment, artichaut à la romaine, tomate séchée, origan',
   13, 2),
  ('pizza', 'Cheesy',
   'Tomate, mozzarella fior di latte, gorgonzola, pecorino romano, persillade maison',
   14, 3),
  ('pizza', 'Regina',
   'Tomate, mozzarella fior di latte, champignons de paris, jambon, persillade maison',
   15, 4),
  ('antipasti', 'Burrata',
   'Tomate séchée avec huile d''olive, basilic, tranches de pain maison',
   9, 1),
  ('antipasti', 'Focaccia',
   'Pain italien à l''huile d''olive, fleur de sel, romarin',
   5, 2),
  ('dessert', 'Pizza Nocciolata', '', 5, 1),
  ('dessert', 'Mousse au chocolat',
   'Faite maison et avec amour, comme tout ce que nous servons ♥',
   5, 2);

INSERT INTO supplements (category_id, label, detail, price) VALUES
  ('pizza', 'Suppléments', '½ burrata ou jambon', 3);

INSERT INTO hours (day_label, time_range, sort_order) VALUES
  ('Lundi',    'Fermé',                          1),
  ('Mardi',    'Fermé',                          2),
  ('Mercredi', '12h00 – 14h00 · 19h00 – 22h00', 3),
  ('Jeudi',    '12h00 – 14h00 · 19h00 – 22h00', 4),
  ('Vendredi', '12h00 – 14h00 · 19h00 – 22h00', 5),
  ('Samedi',   '12h00 – 14h00 · 19h00 – 22h00', 6),
  ('Dimanche', '12h00 – 14h00',                 7);
