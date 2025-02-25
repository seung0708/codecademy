import React from "react";
import {ContactPicker} from '../contactPicker/ContactPicker';

const getTodayString = () => {
  const [month, day, year] = new Date()
    .toLocaleDateString("en-US")
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const AppointmentForm = ({
  contacts,
  name,
  setName,
  contact,
  setContact,
  date,
  setDate,
  time,
  setTime,
  handleSubmit
}) => {

  const handleNameChange = (e) => setName(e.target.value)
  const handleDateChange = (e) => setDate(e.target.value)
  const handleTimeChange = (e) => setTime(e.target.value)

  const contactNames = contacts.map(contact => contact.name)

  return (
    
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder="Enter name..." value={name} onChange={handleNameChange} />
      <input type='date' name='date' placeholder="Enter Date.." value={date} onChange={handleDateChange} min={getTodayString()} />
      <input type='time' name='time' placeholder="Enter Time..." value={time} onChange={handleTimeChange} />
      <ContactPicker contacts={contactNames} name='contact' value={contact} onChange={e => setContact(e.target.value)} />
      <input type='submit' value='Submit' />
    </form>
  );
};
