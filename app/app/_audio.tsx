"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaMicrophone } from "react-icons/fa";

export default function AudioOption() {
  return (
    <Card className="space-y-2">
      <CardHeader>
        <CardTitle>Audio</CardTitle>
        <CardDescription>Record an audio prompt!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <Button
          className="rounded-xl bg-red-500 hover:bg-red-400"
          onClick={() => {
            console.log("handle audio recording");
          }}
        >
          <FaMicrophone />
        </Button>

        {/* TODO: Create way to record audio and send it via POST request */}
      </CardContent>
    </Card>
  );
}
