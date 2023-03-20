import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from './componentes/Card/Card';
import ReactHookForm from './componentes/ReactHookForm/ReactHookForm';
import { createUser, getUser, updateUser, deleteUser } from './services/services';

const App = () => {
  // Estado que almacena la lista de peliculas
  const [user, setUser] = useState([]);
  // Estado que indica si las peliculas estan en proceso de carga
  const [isLoading, setIsLoading] = useState(false);
  // Estado que indica si se esta editanto una pelicula y cuando se esta editando almacena el id de la pelicula que esta siendo editada
  const [idUserToUpdate, setIdUserToUpdate] = useState(null);

  // Uso de la libreria react-hook-form
  // register: sirve para registrar inputs
  // handleSubmit: retorna la funciona manejadora para el evento submit del formulario de interes, recibe un callback
  // reset: permite modificar el valor de los inputs mediante un objeto que tienen pares llave-valor siendo la llave el nombre de unos de los inputs y su valor lo que se quiere asignar a ese input
  const { register, handleSubmit, reset } = useForm();

  // Obtiene las peliculas y las guarda en la variable de estado
  const loadUser = async () => {
    try {
      // Indica que ha iniciado la carga de las peliculas
      setIsLoading(true);
      // Guarda el resultado de la petición de tipo GET que realiza la función asincrona "getUser"
      const userFromBackend = await getUser();

      // Almacena las peliculas obtenidas en la variable de estado "user"
      setUser(userFromBackend);
      // Indica que ha finalizado la carga de las peliculas
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Función que crea ó actualiza una pelicula
  const handleUpdateCreate = async (dataForm) => {
    setIsLoading(true);
    if (idUserToUpdate) await updateUser(idUserToUpdate, dataForm);
    else await createUser(dataForm);

    // Cargamos las peliculas nuevamente para obtener su versión más actualizada
    await loadUser();

    // Reset del idMovieToUpdate que es quien nos permite saber si se esta editando o creando
    setIdUserToUpdate(null);

    setIsLoading(false);
  };

  // Borra la pelicula con el id que se le pase y actualiza la vista
  const handleDeleteUser = async (userId) => {
    // Ejecuta una petición de tipo DELETE para borrar la pelicula con el id pasado
    await deleteUser(userId);
    // Carga las peliculas nuevamente para obtener su versión mas actualizada
    await loadUser();
  };

  // Función que toma la información de una pelicula y la carga en el formulario manejado por la libreria react-hook-form
  const loadUserToReactHookForm = (userData) => {
    // División de la informacion recibida en: id y data, conteniendo la ultima toda la información restante diferente al id (name, genre, duration y release_date)
    const { id, ...data } = userData;
    // Cambia el valor de los inputs del formulario por el valor de la pelicula recibida
    reset(data);
    // Almacena el valor del id en la variable de estado que indica si esta editando una pelicula
    // Cambi
    setIdUserToUpdate(id);
  };
  // Ejecuta lógica cuando el componente se monta
  useEffect(() => {
    // Carga las peliculas por primera vez
    loadUser();
  }, []);

  return (
    <div className="card">
      <ReactHookForm
        handleUpdateCreate={handleUpdateCreate}
        idMovieToUpdate={idUserToUpdate}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <section>
        <h2 className="text-2xl text-cyan-400 font-bold text-center mb-5">user List</h2>
        <div className="">
          {isLoading ? (
            <p>Loading user...</p>
          ) : (
            user.map((user) => (
              <Card
                user={user}
                key={user.id}
                deleteUser={handleDeleteUser}
                // loadUserToForm={loadUserToTraditionalForm}
                loadUserToForm={loadUserToReactHookForm}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
