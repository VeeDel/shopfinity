import React, { useContext } from "react";
import styles from "./footer.module.css";
import logo from "../images/logo-small.avif";
import {
  FacebookLogo,
  InstagramLogo,
  SignOut,
  TiktokLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
export default function Footer({ user }) {
  const { handleLogout } = useContext(ShopContext);
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.description}>
          {!user ? (
            <img src={logo} alt="logo" />
          ) : (
            <div className="ml-3">
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-danger "
              >
                Logout <SignOut size={18} />
              </button>
            </div>
          )}
          <b>
            <p>
              A brand that strives to inspire and push creative culture forward.
            </p>
          </b>
          <p>
            We approach our work with the mentality that every product made is a
            learning experience to improve our craft. We are practitioners and
            purveyors of creative culture and are inspired by its various forms
            from art, design, fashion, music, film, food, and more.
          </p>
          <div className={styles.socialMedias}>
            <Link>
              <FacebookLogo
                className={styles.socialIcons}
                size={24}
                color="blue"
              />
            </Link>
            <Link>
              {" "}
              <InstagramLogo
                className={styles.socialIcons}
                size={24}
                color="pink"
              />
            </Link>
            <Link>
              {" "}
              <YoutubeLogo
                className={styles.socialIcons}
                size={24}
                color="red"
              />
            </Link>
            <Link>
              {" "}
              <TiktokLogo
                className={styles.socialIcons}
                size={24}
                color="black"
              />
            </Link>
            <Link>
              {" "}
              <TwitterLogo
                className={styles.socialIcons}
                size={24}
                color="skyBlue"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
echo "# shopfinity" >> README.md
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/VeeDel/shopfinity.git
git push -u origin main