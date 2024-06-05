import fs from "fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('Loading meals error');
  return db.prepare(`SELECT * FROM meals`).all();
}

export async function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('Loading meals error');
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  const buffer = Buffer.from(bufferedImage);

  stream.write(buffer, (error) => {
    if (error) {
      throw new Error("Save image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug) 
      VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
      )
   `
  ).run(meal);
}
