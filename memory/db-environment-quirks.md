---
name: db-environment-quirks
description: WAMP MySQL setup quirks for touriste_db — port, service, table engine, duplicate seed data
metadata:
  type: project
---

The backend DB (`touriste_db`) lives in the **WAMP MySQL 8.4** datadir (`C:\wamp64\bin\mysql\mysql8.4.7\data`), served by the `wampmysqld64` service on **port 3306** (matches `.env`). That service is often **stopped**; a separate `wampmariadb64` runs on **3307** with an empty DB (no `touriste_db`). Starting the service needs admin, but you can launch it directly:
`"/c/wamp64/bin/mysql/mysql8.4.7/bin/mysqld.exe" --defaults-file=".../my.ini" --port=3306 --console` (run in background).

**Why it matters / how to apply:**
- Most tables (incl. `users`, `apprendre_progress`) are **MyISAM** → no foreign-key support and **transactions are silently ignored** (DB::beginTransaction/rollBack won't revert writes). For new migrations, don't add FKs referencing these tables — use a plain `unsignedBigInteger(...)->index()` and enforce the relation at the app layer. For test cleanup, use explicit DELETEs, not transaction rollback.
- `apprendre_missions` was **seeded 4×** — every (track, mission_number) has 4 duplicate rows (raw counts: darija 28, tifinagh 24, culture 24; distinct mission_numbers: 7/6/6). Any "count missions" logic must use `COUNT(DISTINCT mission_number)`, not raw row counts. See [[learning-certificates-feature]].
