import React from "react";

const AuthCard = ({ children, title }) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20">

      {/* Optional Title */}
      {title && (
        <h2 className="text-xl font-semibold text-white text-center mb-5">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
};

export default AuthCard;
