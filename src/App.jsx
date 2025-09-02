
//git remote add upstream https://github.com/Webwiznitr/WebwizExam.git

//git remote -v  # Verify remotes
//git checkout -b feature/my-new-feature
//git push origin feature/my-new-feature


import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const getInfo = async () => {
    const response = await fetch(`https://dummyjson.com/users/search?q=${search}`);
    return await response.json();
  }

  useEffect(() => {
    if (search.length > 0) {
      getInfo().then((item) => setData(item.users || []));
    } else if (search.length === 0) {
      setData([]);
    }
  }, [search]);

 

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        placeholder="Search .."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md p-2 m-4"
      />
      {selectedUser && (
        <div className="flex flex-col items-center border bg-blue-400 text-white rounded-md p-4 m-4 w-[200px]">
          <h2 className="text-xl font-bold mb-2">{selectedUser.firstName} {selectedUser.lastName}</h2>
        </div>
      )}
      {data.length > 0 && (
        <select
          className="border rounded-md p-2 m-2"
          onChange={e => {
            const user = data.find(user => user.id === Number(e.target.value));
            setSelectedUser(user || null);
          }}
          defaultValue=""
        >
          <option value="" disabled>Select</option>
          {data.map(item => (
            <option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
export default App








  
// ...existing code...

 
