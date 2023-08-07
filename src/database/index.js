import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "myContacts",
  password: "yancerqueira",
  database: "contacts",
});

client.connect();

export async function query(query, values) {
  const { rows } = await client.query(query, values);
  return rows;
}
