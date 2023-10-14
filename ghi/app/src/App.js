import React from "react"
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeConferenceForm from './AttendeeConferenceForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
        <Route index element={<MainPage />} />
        <Route path ="attendees">
          <Route path="new" element={<AttendeeConferenceForm />} />
          </Route>
          <Route path ="conferences">
          <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path ="locations">
          <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path ="presentations">
          <Route path="new" element={<PresentationForm />} />
          </Route>
          <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
