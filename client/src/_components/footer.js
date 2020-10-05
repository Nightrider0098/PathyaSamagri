import React, { Component } from 'react'
import './footer.css'
class footer extends Component {
    render() {
        return (

            <div className="container footer-special ml-1 mr-1 bg-dark">
                <div className="row">
                    <div className="col-sm-4 p-4">
                        <div className="footer-col-3" >
                            <h5 style={{ color: 'white' }}>About Us</h5>
                            {/* <h5 className="mb-3" style={{ color: 'white' }}></h5> */}
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
            </div >


        )
    }
}

export default footer
