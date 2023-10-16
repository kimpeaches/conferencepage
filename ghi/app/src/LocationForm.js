import React, { useEffect, useState } from 'react';

function LocationForm(props) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create an empty JSON object
    const data = {};

    data.room_count = roomCount;
    data.name = name;
    data.city = city;
    data.state = state;

    console.log(data);

    const locationUrl = 'http://localhost:8000/api/locations/';
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
        const newLocation = await response.json();
        console.log(newLocation);
        resetForm();
    }
 }
   const resetForm = () => {
    setName('');
    setRoomCount('');
    setCity('');
    setState('');
}


  const [state, setState] = useState('');
  const [name, setName] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [city, setCity] = useState('');

  const [states, setStates] = useState([]);
  const fetchData = async () => {
    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setStates(data.states);
    }
  }

  const handleStateChange = (e) => {
    const value = e.target.value;
    setState(value);
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  }

  const handleRoomCountChange = (e) => {
    const value = e.target.value;
    setRoomCount(value);
  }

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
  }


  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="p-4 mt-4" style={{ color: '#407aac' }}>
            <h1>Create a new location</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" value={name} required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleRoomCountChange} placeholder="Room count" value={roomCount} required type="number" name="room_count" id="room_count" className="form-control" />
                <label htmlFor="room_count">Room count</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCityChange} placeholder="City" value={city} required type="text" name="city" id="city" className="form-control" />
                <label htmlFor="city">City</label>
              </div>
              <div className="mb-3">
              <select onChange={handleStateChange} required name="state" value={state} id="state" className="form-select">
                <option>Choose a state</option>
                {states.map(state => {
                    return (
                        <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                        </option>
                    );
                })}
              </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default LocationForm;
