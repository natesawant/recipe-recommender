"use client";
import AudioRecorder from "@/components/AudioRecorder";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Recipe } from "./_text";
import RecipeCard from "@/components/ui/recipe";

export default function AudioOption() {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>();

  const postAudioQuery = async ({ file }: { file: File }) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const response = await fetch("http://localhost:8000/recommend/audio", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    return await response.json();
  };

  const mutation = useMutation({
    mutationFn: postAudioQuery,
    onSuccess: (data) => {
      console.log("response data:", data);
      setRecipes(data.recommendations as Recipe[]);
    },
  });

  const handleSubmit = (encodedData: File) => {
    if (!encodedData) {
      toast({
        title: "Error",
        description: "Please enter a query!",
        variant: "destructive",
      });
      return;
    }

    console.log("final data", encodedData);

    mutation.mutate({ file: encodedData });
  };

  return (
    <Card className="space-y-2">
      <CardHeader>
        <CardTitle>Audio</CardTitle>
        <CardDescription>Record an audio prompt!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <AudioRecorder
          handleSubmit={handleSubmit}
          loading={mutation.isPending}
        />
      </CardContent>
      <CardFooter>
        <ul className=" flex flex-col gap-4">
          {recipes &&
            recipes.map((recipe, idx) => (
              <RecipeCard key={idx} recipe={recipe} />
            ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
