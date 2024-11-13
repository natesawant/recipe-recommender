import { Recipe } from "@/app/_text";
import { CardDescription, CardTitle } from "./card";

export default function RecipeCard(props: { recipe: Recipe }) {
    const name = props.recipe.name;
    const description = props.recipe.description;
    const ingredients = props.recipe.ingredients
    const directions = props.recipe.directions

    return <li className="flex flex-col gap-2">
        <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription className="italic">{description}</CardDescription>
        </div>
        <div>
            <h3>Ingredients</h3>
            <ol className="list-disc list-inside">{ingredients.map((ing, iidx) => <li key={iidx}>{ing}</li>)}</ol>
        </div>
        <div>
            <h3>Directions</h3>
            <ol className="list-decimal list-inside">{directions.map((dir, didx) => <li key={didx}>{dir}</li>)}</ol>
        </div>
    </li>
}