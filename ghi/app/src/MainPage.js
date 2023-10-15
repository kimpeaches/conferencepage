import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ConferenceColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const conference = data.conference;
        return (
          <div key={conference.href} className="card mb-3 shadow">
            <img src={conference.location.picture_url} className="card-img-top" />
            <div className="card-body bg-dark"  style={{ color: '#407aac'}}>
              <h5 className="card-title">{conference.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {conference.location.name}
              </h6>
              <p className="card-text">
                {conference.description}
              </p>
            </div>
            <div className="card-footer">
              {new Date(conference.starts).toLocaleDateString()}
              -
              {new Date(conference.ends).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const MainPage = (props) =>  {
  const [conferenceColumns, setConferenceColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const columns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const conferenceResponse of responses) {
          if (conferenceResponse.ok) {
            const details = await conferenceResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(conferenceResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        setConferenceColumns(columns);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1635151227785-429f420c6b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-transparent">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold" style={{ color: '#407aac' }}>Conference GO!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4" style={{ color: '#407aac' }}>
            The only resource you'll ever need to plan an run your in-person or
            virtual conference for thousands of attendees and presenters.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 style={{ color: '#407aac' }}>Upcoming conferences</h2>
        <div className="row">
          {conferenceColumns.map((conferenceList, index) => {
            return (
              <ConferenceColumn key={index} list={conferenceList} />
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
}

export default MainPage;
