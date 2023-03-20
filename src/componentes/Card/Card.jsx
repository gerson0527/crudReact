import React from 'react';

const Card = ({ user, deleteUser, loadUserToForm }) => {
  return (
    <article className="">
      <h2 className="">{user.email}</h2>
      <ul className="">
        <li>
          <span className="">email: </span>
          {user.email}
        </li>
        <li>
          <span className="">password: </span>
          {user.password}
        </li>
        <li>
          <span className="">last_name: </span>
          {user.last_name}
        </li>
        <li>
          <span className="">first_name: </span>
          {user.first_name}
        </li>
        <li>
          <span className="">birthday date: </span>
          {user.birthday_date}
        </li>
      </ul>
      <div className="">
        <button className="" onClick={() => deleteUser(user.id)}>
          🚨Borrar🚨
        </button>
        <button className="" onClick={() => loadUserToForm(user)}>
          ✏Edit✏
        </button>
      </div>
    </article>
  );
};

export default Card;
