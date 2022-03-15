import { BiArchive, BiCalendar } from "react-icons/bi";
import {useState, useEffect, useCallback} from 'react'
import Search from "./components/Search";
import AddApointment from "./components/AddApointment";
import AppointmentInfo from "./components/AddAppointmentInfo";
import  apointmentList from "./data.json"
function App() {
  const [itemSearched, setItemSearched] = useState([]);
  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setItemSearched(data));
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData]);
  
  return (
    <div className="App container mx-auto mt-3 font-thin ">
      <h1 className="text-5xl mb-3">
      <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointment</h1>
      <AddApointment/>
      <Search search={itemSearched} onSearch={fetchData}/>
      <ul className='divide-y divide-gray-200'>
        {apointmentList.map((appointment => (
          
          <AppointmentInfo key={appointment.id}
            onDeleteApointmentId={appointmentId => 
            setItemSearched(apointmentList.filter(appointment => appointment.id === appointmentId)) }
            appointment={appointment} />
        )))
        }
      </ul>
    </div>
  );
}

export default App;
