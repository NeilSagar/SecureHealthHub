import React, { useState } from 'react';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      // Send the password change request to the backend
      const response = await fetch('/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });


      const data = await response.json();

      // Handle the response (success or error) here
      console.log(data); // Data will contain the response from the backend


      if (response.ok) {
        alert('Password changed successfully');
      } else {
        alert('Password change failed');
      }
    } catch (error) {

      console.error('Error changing password:', error);
    }
  };

  return (
    <form onSubmit={handlePasswordChange}>
      {/* Password change form inputs */}
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default PasswordChangeForm;