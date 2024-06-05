import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/libs/meals";
import { notFound } from "next/navigation";


// export const metadata = {
//   title: '...',
// }


export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailPage({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header>
        <div className={classes.header}>
          <Image fill src={meal.image} alt="Meals Detail" />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions?.replace(/\n/g, "<br />") ?? "",
          }}
        ></p>
      </main>
    </>
  );
}
