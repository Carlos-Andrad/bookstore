import { Pool } from 'pg';

// Substitua pela sua string de conexão do Render.com
const connectionString = 'postgresql://livrariadb_user:YBCVxk78e6ZglyxDzoDP9FhAeapHd3Rf@dpg-cshbogbtq21c73fnlm3g-a.oregon-postgres.render.com/livrariadb';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Permite conexões SSL não autorizadas
  }
});

export default pool;