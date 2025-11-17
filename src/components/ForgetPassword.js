import React from "react";

const ForgetPassword = () => {
  return (
    <div className="container-fliud mt-5 text-white"style={{backgroundImage:`url(https://img.freepik.com/premium-photo/elegant-modern-black-background_198067-877484.jpg?semt=ais_incoming&w=740&q=80)`,
      height:"100vh"
    }}>
      <h2 className="text-center">Forget Password</h2>
      <form className="bg-dark p-4 rounded mx-auto" style={{ maxWidth: "400px", backgroundImage:`url(https://www.hdwallpapers.in/download/vector_design_hdtv_wide-HD.jpg)` }}>
        <input type="email" className="form-control mb-3" placeholder="Enter your email" required />
        <button className="btn btn-warning w-100">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgetPassword