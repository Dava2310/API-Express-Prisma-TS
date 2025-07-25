import db from '@/database/mysql';
import { User } from '@/models/UserModel';

const testMysql = async () => {
  const testEmail = 'test@example.com';

  try {
    console.log('🔨 1. Insertando usuario...');
    const userData: Partial<User> = {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: testEmail,
      password: '123456',
      numeroTelefono: '123456789',
      chatId: 'fakeChatId123',
    };

    const insertResult = await db.createRecord('usuarios', userData);
    console.log('✅ Usuario insertado:', insertResult);

    console.log('\n🔎 2. Buscando usuario por email...');
    const user = await db.findOneRecord('usuarios', { email: testEmail });
    console.log('📄 Usuario encontrado:', user);

    console.log('\n✏️ 3. Actualizando nombre del usuario...');
    const updateResult = await db.updateRecord('usuarios', { nombre: 'Carlos' }, { email: testEmail });
    console.log('✅ Usuario actualizado:', updateResult);

    console.log('\n🔁 4. Verificando actualización...');
    const updatedUser = await db.findOneRecord('usuarios', { email: testEmail });
    console.log('📄 Usuario actualizado:', updatedUser);

    // console.log('\n🗑️ 5. Eliminando usuario...');
    // const deleteResult = await db.deleteRecord('usuarios', { email: testEmail });
    // console.log('✅ Usuario eliminado:', deleteResult);

    // console.log('\n🔍 6. Confirmando eliminación...');
    // const deletedUser = await db.findOneRecord('usuarios', { email: testEmail });
    // if (!deletedUser) {
    //   console.log('✅ Usuario eliminado correctamente.');
    // } else {
    //   console.error('❌ El usuario todavía existe:', deletedUser);
    // }
  } catch (error) {
    console.error('🔥 Error durante el test:', error);
  } finally {
    await db.pool.end();
    console.log('\n🚪 Conexión cerrada. Test finalizado.');
  }
};

testMysql();
