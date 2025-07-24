import app from './app';
import prisma from './database/prisma';

async function bootstrap() {
  try {
    // Verificando conexión con la BD.
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');

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
