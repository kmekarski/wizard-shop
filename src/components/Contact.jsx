import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Contact(props) {
  return (
    <div className="contact">
      <div className="container">
        <h2 className="text--primary">Contact us</h2>
        <h4 className="text--secondary">
          Phone number: <b>+48 0b1111100101</b><br/>
          Email address: <b>35pietro@polsl.pl</b>
        </h4>
      </div>
    </div>
  );
}