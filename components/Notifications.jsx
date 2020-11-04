import React from "react";

const Notifications = () => {
  return (
    <div>
      <div className="arrow-up" />
      <div className={`flex flex-col text-black bg-white rounded-md`}>
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
      </div>
    </div>
  );
};

export default Notifications;
