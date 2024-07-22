

// // const index =()=>
// //   {
// //     return(
// //        <>
// //        <nav>
// //         <ul className="menu-bar">
// //           <li>
// //             <a href="/">Home</a>
// //           </li>
// //           <li>
// //             <a href="/register">Register</a>
// //           </li>
// //           <li>
// //             <a href="/login">Login</a>
// //           </li>
// //           <li>
// //             <a href="/logout">Logout</a>
// //           </li>
// //           <li>
// //             <a href="/ticketbooking">Book Your Ticket</a>
// //           </li>
// //           <li>
// //             <a href="/contact">Contact</a>
// //           </li>
// //         </ul>
// //        </nav>


// //       <header className="header">
// //       <div className="brand_box"></div>
 
// //  <div className="text_box">
// //   <h1 className="heading_primary">
// //     <span className="heading_primary_main">
// //       Welcome to Airline Booking System
// //     </span>
// //   </h1>
// //   <a href="#" className="btn btn_white btn_animated">
// //     Happy Joureny!!
// //   </a>
// //  </div>
// //  </header>
// //    </>
  
// //    );
// //   };
// //   export default index;


//inline style

import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';

const index = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Airline Booking System</h1>
                <Navbar></Navbar>
            </header>
            <main className={styles.main}>
                <h2>Welcome to Airline Booking System</h2>
                <p>Book your flights easily and quickly!</p>
                <Link href="/about">
                <button className={styles.ctaButton}>Explore Flight</button>
                </Link>
                
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2024 Airline Booking System. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default index;
