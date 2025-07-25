import app from './app';
import prisma from './database/prisma';
import db from '@/database/mysql';

async function bootstrap() {
  try {
    // Verificando conexión con la BD.
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');

    // Verificar conexión con MySQL2
    const conn = await db.pool.getConnection();
    await conn.ping(); // opcional, para verificar que responde
    conn.release();
    console.log('✅ Conexión directa a MySQL (pool) exitosa');

    // Corriendo la aplicación
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en http://localhost:${app.get('port')}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Termina la ejecución del proceso
  }
}

bootstrap();
