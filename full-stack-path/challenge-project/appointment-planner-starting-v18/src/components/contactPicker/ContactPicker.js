import React from "react";

export const ContactPicker = ({value, name, onChange, contacts}) => {
  return (
    <select value={value} name={name} onChange={onChange}>
      <option value={""}>No Contact Selected</option>
      {contacts.map(contact => (
        <option value={contact} key={contact}>{contact}</option>
      ))}
    </select>
  );
};
