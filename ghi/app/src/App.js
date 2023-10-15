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
      <div style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1635151227785-429f420c6b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
    <BrowserRouter>
      <Nav />
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
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
