"use client";
import AudioRecorder from "@/components/AudioRecorder";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function AudioOption() {
  return (
    <Card className="space-y-2">
      <CardHeader>
        <CardTitle>Audio</CardTitle>
        <CardDescription>Record an audio prompt!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        {/* TODO: Create way to record audio and send it via POST request */}
        <AudioRecorder />
      </CardContent>
    </Card>
  );
}
