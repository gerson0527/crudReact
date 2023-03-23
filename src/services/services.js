import axios from 'axios';

const BASE_URL = 'https://users-crud.academlo.tech/';

export const getUser = async () => {
  try {
    const res = await axios.get(BASE_URL + 'users/');

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (usersId) => {
  try {
    await axios.delete(BASE_URL + `users/${usersId}/`);

    console.log(`El usuario con el id <${usersId}> fue eliminado`);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (usersId, newDataUser) => {
  try {
    await axios.put(BASE_URL + `users/${usersId}/`, newDataUser);

    console.log(`El usuario ${newDataUser.name} fue actualizada exitosamente`);
  } catch (error) {
    console.error(error);
  }
};
export const createUser = async (dataUser) => {
  try {
    await axios.post(BASE_URL + 'users/', dataUser);

    console.log('Se creo existosamente');
  } catch (error) {
    console.error(error);
  }
};
