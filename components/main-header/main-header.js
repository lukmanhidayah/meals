import logoSrc from "@/assets/logo.png";
import Link from "next/link";
import MainHeaderBackgrond from "@/components/main-header/main-header-background";
import classes from "./main-header.module.css";
import Image from "next/image";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackgrond />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image width={124} height={124} src={logoSrc.src} alt="A plete ..." />
          Next Level Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Food Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
