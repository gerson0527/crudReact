import React from 'react';

const ReactHookForm = ({
  idUserToUpdate,
  handleSubmit,
  register,
  reset,
  handleUpdateCreate,
}) => {
  const emptyValueForm = {
    email: '',
    password: '',
    last_name: '',
    first_name: '',
    birthday_date: '',
  };

  const myHandleSubmit = async (data) => {
    await handleUpdateCreate(data);
    reset(emptyValueForm);
  };

  return (
    <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit(myHandleSubmit)}>
      <h2>{idUserToUpdate ? 'Edit' : 'Create'} Movie - React Hook Form Version</h2>
      <div>
        <label htmlFor="emailId">email: </label>
        <input type="email" id="emailId" className="text-black" {...register('email')} />
      </div>
      <div>
        <label htmlFor="passwordId">password: </label>
        <input
          type="password"
          id="passwordId"
          className="text-black"
          {...register('password')}
        />
      </div>
      <div>
        <label htmlFor="lastNameId">lastName: </label>
        <input
          type="text"
          name="last_name"
          id="lastNameId"
          className="text-black"
          {...register('last_name')}
        />
      </div>
      <div>
        <label htmlFor="fristNameId">fristname: </label>
        <input
          type="text"
          name="first_name"
          id="fristNameId"
          className="text-black"
          {...register('first_name')}
        />
      </div>
      <div>
        <label htmlFor="birthdayDataId">Birthdaye Date: </label>
        <input
          type="date"
          id="birthdayDataId"
          className="text-black"
          {...register('birthday_date')}
        />
      </div>

      <button type="submit" className="border border-transparent hover:border-cyan-400">
        {idUserToUpdate ? 'Edit' : 'Create'} User
      </button>
    </form>
  );
};

export default ReactHookForm;
