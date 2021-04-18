import React, { Component } from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer class="bg-dark text-center text-white">
      <div >
        <section className="pt-5">
          <h3>A book reused is a tree saved.</h3>
        </section>
        <section className="mt-4">

          <div className="row">
            <div className="col-sm-4 p-4">
              <div className="footer-col-3" >
                <h5 style={{ color: 'white' }}>About Us</h5>
                <h6 style={{ color: 'white' }}> Address:</h6>
                <h6 style={{ color: 'white' }}> Near Isschanath chakra,SVNIT,Dumas Road Surat </h6>
              </div>
            </div>

            <div className="col-sm-4 p-4 text-center m-auto align-items-center">
              <h5 style={{ color: 'white' }}>Have You any Question?</h5>
              <h6 style={{ color: 'white' }}>hitesh08011999@gmail.com</h6>
            </div>

            <div className="col-sm-4 p-4 m-auto align-content-center">
              <h3 className="follow-heading" >Follow Us </h3>
              <div className="text-center">
                <i className="fab fa-facebook-f fa-2x" style={{ margin: '0 10px', color: 'white' }}></i>
                <i className="fab fa-twitter fa-2x" style={{ margin: '0 10px', color: 'white' }}></i>
                <i className="fab fa-instagram fa-2x" style={{ margin: '0 10px', color: 'white' }}></i>

              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
