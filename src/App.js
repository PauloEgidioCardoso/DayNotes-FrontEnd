import React, { useState, useEffect, useRef } from "react";

import api from "./services/api";

import './style/app.css';
import './style/global.css';
import './style/sideBar.css';
import './style/main.css';

import Notes from "./Components/Notes";
import RadioButton from "./Components/RadioButton";


function App() {
  const [selectedValue, setSelectedValue] = React.useState('all');
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getAllNotes();

  }, [])

  async function getAllNotes() {
    const response = await api.get('/annotations');
    setAllNotes(response.data);
  }

  async function loadNotes(option) {
    const params = { priority: option };
    const response = await api.get('/priorities', { params });

    if(response){
      setAllNotes(response.data);
    }
    
  }

  const handleChange = (e) => {
    setSelectedValue(e.value);

    if(e.checked && e.value != 'all'){
      loadNotes(e.value);
    }
    else{
      getAllNotes();
    }
  };

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);

    if (deletedNote) {
      setAllNotes(allNotes.filter(note => note._id != id));
    }
  }

  async function handleChangePriority(id) {
    const changedPriority = await api.post(`/priorities/${id}`);

    if (changedPriority && selectedValue != 'all') {
      loadNotes(selectedValue)
    }
    else if (changedPriority)
    getAllNotes();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/annotations", {
      title,
      notes,
      priority: false
    })
    setTitle("");
    setNotes("");

    if(selectedValue != 'all'){
      getAllNotes()
    }
    else{
      setAllNotes([...allNotes, response.data])
    }
    setSelectedValue("all");
  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById("btn_submit")
      btn.style.background = "#FFD3CA"
      if (title && notes) {
        btn.style.background = "#EB8F7A"
      }
    }
    enableSubmitButton();
  }, [title, notes])

  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas</strong>

        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Titulo da Anotação</label>
            <input
              placeholder="Insira um texto"
              required
              maxLength={30}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              placeholder="Insira um texto"
              required
              maxLength={500}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button id="btn_submit" type='submit'>Salvar</button>
        </form>
        <RadioButton
        selectedValue={selectedValue}
        handleChange={handleChange}
        />
      </aside>

      <main>
        <ul>
          {allNotes.map(data => (
            <Notes
              key={data._id}
              data={data}
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}


export default App;
