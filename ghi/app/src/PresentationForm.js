import React, { useEffect, useState } from 'react';

function PresentationForm(props) {

    const [conference, setConference] = useState('');
    const [presenter_name, setName] = useState('');
    const [presenter_email, setEmail] = useState('');
    const [conferences, setConferences] = useState([]);
    const [title, setTitle] = useState();
    const [synopsis, setSynopsis] = useState();
    const [company_name, setCompanyName] = useState();


    const fetchData = async () => {
      const url = 'http://localhost:8000/api/conferences/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setConferences(data.conferences);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {};
      data.conference = conference;
      data.presenter_name = presenter_name;
      data.presenter_email = presenter_email;
      data.title = title;
      data.synopsis = synopsis;
      data.company_name = company_name;

      const conferenceUrl = `http://localhost:8000${conference}presentations/`;
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
        resetForm();
        console.log(newConference);
      }
    }

    const resetForm = () => {
        setName('');
        setConference('');
        setEmail('');
        setTitle('');
        setSynopsis('');
        setCompanyName('');
    }

    const handleChangeConference = (event) => {
      const value = event.target.value;
      setConference(value);
    }

    const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    }

    const handleEmailChange = (event) => {
      const value = event.target.value;
      setEmail(value);
    }

    const handleCompanyNameChange= (event) => {
        const value = event.target.value;
        setCompanyName(value);
      }

    const handleTitleChange= (event) => {
        const value = event.target.value;
        setTitle(value);
      }

    const handleSynopsisChange= (event) => {
        const value = event.target.value;
        setSynopsis(value);
      }


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Presenter name" value={presenter_name} required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmailChange} placeholder="Presenter email" value={presenter_email} required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCompanyNameChange} placeholder="Company name" value={company_name} type="text" name="company_name" id="company_name" className="form-control" />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTitleChange} placeholder="Title" required type="text" value={title} name="title" id="title" className="form-control" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleSynopsisChange} id="synopsis" rows="3" value={synopsis} name="synopsis" className="form-control"></textarea>
              </div>
              <div className="mb-3">
              <select onChange={handleChangeConference} name="conference" value={conference} id="conference" required>
                    <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                      return (
                        <option key={conference.href} value={conference.href}>{conference.name}</option>
                      )
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

export default PresentationForm;
