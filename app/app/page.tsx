"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AudioOption from "./_audio";
import TextOption from "./_text";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
        <Card className="min-w-[50vw] px-64 h-fit">
          <CardHeader>
            <CardTitle>Recipe Recommender</CardTitle>
            <CardDescription>Crave it? Say it. Cook it.</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="audio" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 my-2">
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>
              <TabsContent value="audio">
                <AudioOption />
              </TabsContent>
              <TabsContent value="text">
                <TextOption />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter>
            {/* TODO: Create recipe card here when a response is received */}
          </CardFooter>
        </Card>
      </main>
      <footer className=""></footer>
    </div>
  );
}
