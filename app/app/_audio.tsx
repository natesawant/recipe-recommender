"use client";
import AudioRecorder from "@/components/AudioRecorder";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function AudioOption() {
  const { toast } = useToast();

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
        <AudioRecorder handleSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
}
