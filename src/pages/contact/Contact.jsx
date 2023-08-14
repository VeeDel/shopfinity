import React from "react";
import styles from "./contact.module.css";
export default function Contact() {
  return (
    <div>
      <div className={styles.contact}>
        <h2>Contact Us</h2>
        <form action="">
          <div className={styles.names}>
            <input className={styles.input} type="text" placeholder="Name" />
            <input
              className={styles.input}
              type="text"
              placeholder="LastName"
            />
          </div>
          <input type="email" placeholder="Email" />
          <input type="message" />
        </form>
      </div>
    </div>
  );
}
