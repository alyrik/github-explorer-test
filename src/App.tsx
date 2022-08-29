import React from 'react';

import { SearchForm } from './components/SearchForm/SearchForm';
import { UserList } from './components/UserList/UserList';

function App() {
  return (
    <main className="p-5 flex justify-center">
      <section className="bg-white w-full max-w-[600px] p-4 rounded-md flex flex-col gap-5">
        <SearchForm />
        <UserList />
      </section>
    </main>
  );
}

export default App;
