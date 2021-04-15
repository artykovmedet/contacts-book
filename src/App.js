import React, {useState, useEffect} from 'react';
import Header from "./components/Header";
import ContactsList from "./components/ContactsList";
import axios from 'axios'
import AddForm from "./components/AddForm";

const App = () => {
    const [isShowForm, setIsShowForm] = useState(false)
    const [search, setSearch] = useState('')
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        axios('https://605c25686d85de00170d95af.mockapi.io/users')
            .then(({data}) => setContacts(data))
    }, [])

    const deleteUser = (id) => {
        axios.delete(`https://605c25686d85de00170d95af.mockapi.io/users/${id}`)
            .then(({data}) => {
                setContacts(contacts.filter(el => el.id !== data.id))
            })
    }
    const addUser = (user) => {
        axios.post('https://605c25686d85de00170d95af.mockapi.io/users', user)
            .then(({data}) => setContacts([...contacts, data]))
    }

    return (
        <div className="w-1/3 mx-auto my-6">
            <Header setSearch={setSearch} setIsShowForm={setIsShowForm}/>
            {isShowForm && <AddForm addUser={addUser} setIsShowForm={setIsShowForm}/>}
            <AddForm addUser={addUser}/>
            <ContactsList
                search={search}
                contacts={contacts}
                onDelete={deleteUser}
            />
        </div>
    );
};

export default App;