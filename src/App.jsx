import { useEffect, useState } from 'react';
import UsersForm from './componentes/UserForm/UserForm';
import UserList from './componentes/UserList/UserList';
import WarningDelete from './componentes/WarningDelete/WarningDelete';
import './index.css';
import axios from 'axios';

function App() {
  const [usersList, setUsersList] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [form, setForm] = useState(false);
  const [alert, setAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`https://users-crud.academlo.tech/users/`)
      .then((res) => setUsersList(res.data));
  };

  const selectUser = (user) => {
    getForm();
    setUserSelected(user);
  };

  //======= WINDOWS WARNING (FUNCTION TO COMPONENTS) ========
  const warning = (user) => {
    setAlert(true);
    setUserToDelete(user);
  };

  //========DELETE/CANCEL DELETE(FUNCTION)====
  const deleteUser = (user) => {
    axios
      .delete(`https://users-crud.academlo.tech/users/${user.id}/`)
      .then(() => getUsers());

    setAlert(false);
  };
  const cancelDelete = () => {
    setUserToDelete(null);
    setAlert(false);
  };

  //========= OPEN/CLOSE FORM ========
  const getForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
    setUserSelected(null);
  };

  return (
    <div className="App">
      {form && (
        <UsersForm
          getUsers={getUsers}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          closeForm={closeForm}
        />
      )}
      <UserList
        usersList={usersList}
        selectUser={selectUser}
        getForm={getForm}
        warning={warning}
      />
      <WarningDelete
        alert={alert}
        userToDelete={userToDelete}
        deleteUser={deleteUser}
        cancelDelete={cancelDelete}
      />
      <footer>
        <p>
          <strong>Gerson Ortiz</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
