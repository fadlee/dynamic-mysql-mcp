# MySQL MCP Server

Model Context Protocol (MCP) server for MySQL, enabling AI assistants to query and mutate MySQL data safely through tools.

## Features

- 🔧 Tool-based MySQL access (no required env vars)
- 🔐 Runtime authentication via `auth_mysql`
- 🗂️ List databases and tables
- 🧱 Describe table schemas
- 📄 CRUD-like row operations (`select_rows`, `insert_row`, `update_rows`, `delete_rows`)
- 🌐 MCP resources for table schema discovery

## Installation

```bash
npm install @fadlee/mysql-mcp
# or
bun install @fadlee/mysql-mcp
```

## Usage

### With Claude Desktop

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": ["@fadlee/mysql-mcp"]
    }
  }
}
```

### Direct Usage

```bash
npx @fadlee/mysql-mcp
```

## Authentication Flow (via tools)

1. `auth_mysql` (host default `127.0.0.1`, pass user/password and optional host/port/database/ssl)
2. Optional: `use_database` to switch default DB like SQL `USE <db>`
3. `get_auth_status`
4. Use schema/data tools
5. `logout`

No environment variable is required for auth.

## Quick Tutorial

Gunakan gaya prompt seperti ini saat chat dengan AI yang terhubung ke MCP:

1. "Login ke MySQL lokal pakai user root dan password kosong."
2. "Set database aktif ke my_app."
3. "Tampilkan semua tabel di database aktif."
4. "Jelaskan struktur tabel users, termasuk nama kolom dan tipe datanya."
5. "Ambil 10 data terbaru dari tabel users, urut berdasarkan id descending."
6. "Tambahkan 1 user baru ke tabel users dengan email test@example.com."
7. "Ubah nama user dengan id 1 jadi Budi."
8. "Hapus data user dengan id 1."
9. "Pindah database aktif ke analytics."

Tips: kalau mau operasi ke database tertentu tanpa ganti database aktif, sebutkan langsung nama databasenya di prompt, misalnya "ambil 5 data dari database analytics tabel events".

### Contoh Prompt Tambahan

- Filter tanggal:
  - "Ambil data orders dari 30 hari terakhir berdasarkan kolom created_at."
  - "Tampilkan transaksi tanggal 2026-02-01 sampai 2026-02-10 dari tabel payments."
- Pagination:
  - "Ambil 20 data users, mulai dari data ke-21."
  - "Tampilkan halaman 3 untuk data products dengan 10 data per halaman."
- Pencarian keyword:
  - "Cari users yang email-nya mengandung kata admin."
  - "Ambil posts yang judulnya mengandung kata promo."
- Kombinasi filter + urut:
  - "Ambil 10 invoice status paid, urutkan dari id terbesar."
  - "Tampilkan logs level error, urut terbaru, batasi 50 data."

## Available Tools

- `health`
- `auth_mysql`
- `get_auth_status`
- `logout`
- `list_databases`
- `use_database`
- `list_tables`
- `describe_table`
- `select_rows`
- `insert_row`
- `update_rows`
- `delete_rows`

## Development

```bash
bun install
bun run dev
bun run typecheck
bun run test
bun run build
```

## License

MIT
