import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getInfo = async () => {
    const response = await fetch(`https://dummyjson.com/users/search?q=${search}`);
    return await response.json();
  };

  useEffect(() => {
    if (search.length > 0) {
      getInfo().then((item) => setData(item.users || []));
    } else {
      setData([]);
    }
  }, [search]);

  const handleSelect = (user) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
      setSearch(''); 
      setData([]); 
    }
  };

  const handleDelete = (id) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Container for selected users and search */}
      <div className="flex flex-col items-center border-2 border-blue-400 rounded-lg p-2 bg-white w-[400px]">
        {selectedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full px-3 py-1 m-1 shadow-md"
          >
            <img
              src={user.image}
              alt={user.firstName}
              className="w-6 h-6 rounded-full mr-2 border border-white"
            />
            <span className="font-semibold">{user.firstName} {user.lastName}</span>
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-2 text-lg hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Search For a User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow outline-none p-2 text-gray-800"
        />
      </div>
      {search.length > 0 && (
        <div className="w-[400px] bg-white mt-2 rounded-md shadow-lg p-2">
          {data.length > 0 ? (
            data.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelect(user)}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              >
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="text-gray-700">{user.firstName} {user.lastName}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 italic">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
