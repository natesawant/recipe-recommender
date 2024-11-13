"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/ui/recipe";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// TODO: Move this somewhere else
export type Recipe = {
  name: string,
  description: string,
  ingredients: string[],
  directions: string[],
}

export default function TextOption() {
  const [textInput, setTextInput] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { toast } = useToast();

  const postTextQuery = async ({ value }: { value: string }) => {
    const response = await fetch("http://localhost:8000/recommend/text", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value }),
    });
    return await response.json();
  };

  const mutation = useMutation({
    mutationFn: postTextQuery,
    onSuccess: (data) => {
      console.log("response data:", data);
      setRecipes(data.recommendations as Recipe[])
    },
  });

  return (
    <Card className="space-y-2">
      <CardHeader>
        <CardTitle>Text</CardTitle>
        <CardDescription>Write a text prompt!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <Input
          placeholder="ex. Give me a savory Greek recipe."
          onChange={(e) => setTextInput(e.target.value)}
        />

        {mutation.isError && (
          <p>Something went wrong {mutation.error.message}</p>
        )}

        {mutation.data && <p>{mutation.data.recommendation}</p>}
      </CardContent>
      <CardContent>
        <ul className=" flex flex-col gap-4">
          {recipes && recipes.map((recipe, idx) =>
            <RecipeCard key={idx} recipe={recipe} />
          )}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-row justify-end">
        <Button
          loading={mutation.isPending}
          onClick={() => {
            if (textInput === "") {
              toast({
                title: "Error",
                description: "Please enter a query!",
                variant: "destructive",
              });
              return;
            }

            mutation.mutate({ value: textInput });
          }}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
