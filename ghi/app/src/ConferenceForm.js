import React, { useEffect, useState } from 'react';

function ConferenceForm(props) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create an empty JSON object
    const data = {};

    data.location= location;
    data.name = name;
    data.starts = starts;
    data.ends = ends;
    data.description = description;
    data.max_presentations = max_presentations;
    data.max_attendees = max_attendees;

    console.log(data);

    const conferenceUrl = 'http://localhost:8000/api/conferences/';
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
        const newConference = await response.json();
        console.log(newConference);
        resetForm();
    }
 }
   const resetForm = () => {
    setName('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setPresentation('');
    setAttendee('');
}


  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [starts, setStartDate] = useState('');
  const [ends, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [max_presentations, setPresentation] = useState('');
  const [max_attendees, setAttendee] = useState('');

  const [locations, setLocations] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  }

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
  }

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  }

  const handlePresentationChange = (e) => {
    const value = e.target.value;
    setPresentation(value);
  }

  const handleAttendeesChange = (e) => {
    const value = e.target.value;
    setAttendee(value);
  }


  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" value={name} required type="text" name="name" id="name" className="form-control " />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartDateChange} placeholder="Starts" value={starts} required type="date" name="date" id="date" className="form-control form-control-sm" />
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndDateChange} placeholder="Ends" value={ends} required type="date" name="date" id="date" className="form-control form-control-sm" />
                <label htmlFor="Ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea onChange={handleDescriptionChange}  value={description} className="form-control" aria-label="With textarea"></textarea>
              </div>
               <div className="form-floating mb-3">
                <input onChange={handlePresentationChange} placeholder="Maximum presentations" value={max_presentations} required type="number" name="maximum presentations" id="maximum presentations" className="form-control " />
                <label htmlFor="maximum presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleAttendeesChange} placeholder="Maximum attendees" value={max_attendees} required type="number" name="maximum attendees" id="maximum attendees" className="form-control " />
                <label htmlFor="maximum attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} required id="location"  value={location} name="location" className="form-select">
                 <option>Choose a location</option>
                    {locations.map(location=> {
                    return (
                        <option key={location.name + location.id} value={location.id}>
                            {location.name}
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
};

export default ConferenceForm;
