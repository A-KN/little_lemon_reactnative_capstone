import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("little_lemon.db");

export function createTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
}

export function getMenuItems() {
  return db.getAllSync("SELECT * FROM menu;");
}

export function filterMenuItems(searchText, categories) {
  let query = "SELECT * FROM menu WHERE 1=1";
  const params = [];

  if (searchText.trim() !== "") {
    query += " AND LOWER(name) LIKE ?";
    params.push(`%${searchText.toLowerCase()}%`);
  }

  if (categories.length > 0) {
    const placeholders = categories.map(() => "?").join(",");
    query += ` AND LOWER(category) IN (${placeholders})`;
    params.push(...categories.map(category => category.toLowerCase()));
  }

  return db.getAllSync(query, params);
}

export function clearMenu() {
  db.execSync("DELETE FROM menu;");
}

export function saveMenuItems(menu) {
  const statement = db.prepareSync(`
    INSERT INTO menu
    (name, price, description, image, category)
    VALUES (?, ?, ?, ?, ?);
  `);

  try {
    for (const item of menu) {
      statement.executeSync([
        item.name || item.title,
        item.price,
        item.description,
        item.image,
        item.category,
      ]);
    }
  } finally {
    statement.finalizeSync();
  }
}

export default db;