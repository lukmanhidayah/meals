import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "../../libs/meals";
import { Suspense } from "react";
import MealsLoading from "./loading-out";

import classes from "./page.module.css"; //css

async function Meals() {
  const meals = await getMeals();
  
  return <MealsGrid meals={meals} />;
}

export default async function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}></div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <Suspense fallback={<MealsLoading />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
