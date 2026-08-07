import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("little_lemon.db");

export function createTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT
    );
  `);
}

export function getMenuItems() {
  return db.getAllSync("SELECT * FROM menu;");
}

export function clearMenu() {
  db.execSync("DELETE FROM menu;");
}

export function saveMenuItems(menu) {
  const statement = db.prepareSync(
    `INSERT INTO menu (name, price, description, image)
     VALUES (?, ?, ?, ?);`
  );

  try {
    for (const item of menu) {
      statement.executeSync([
        item.title,
        Number(item.price),
        item.description,
        item.image,
      ]);
    }
  } finally {
    statement.finalizeSync();
  }
}

export default db;