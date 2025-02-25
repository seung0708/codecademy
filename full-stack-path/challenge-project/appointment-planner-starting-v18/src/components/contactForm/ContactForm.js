import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit
}) => {

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder="Enter name..." value={name} onChange={handleNameChange} />
      <input type='tel' name='phone' placeholder="Enter phone number.." value={phone} onChange={handlePhoneChange} />
      <input type='email' name='email' placeholder="Enter email..." value={email} onChange={handleEmailChange} />
      <input type='submit' value='Submit' />
    </form>
  );
};

