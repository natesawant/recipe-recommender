import { FaMicrophone, FaStop } from "react-icons/fa";
import { Button } from "./ui/button";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

enum RecorderState {
  SETTING_UP,
  READY,
  RECORDING,
  FINISHED,
}

export default function AudioRecorder() {
  const { recorder, audio } = useAudioRecorder();
  const [recorderState, setRecorderState] = useState<RecorderState>(
    RecorderState.SETTING_UP
  );

  useEffect(() => {
    if (recorder !== null) {
      setRecorderState(RecorderState.READY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorder]);

  if (recorder === null) {
    return <Skeleton className="h-10 w-[100%]" />;
  }

  console.log("current state:", recorderState);
  console.log("audio url:", audio);

  return (
    <>
      {recorderState === RecorderState.READY && (
        <Button
          className="rounded-3xl bg-red-500 hover:bg-red-400"
          onClick={() => {
            recorder.start();
            setRecorderState(RecorderState.RECORDING);
            console.log("started recording");
          }}
        >
          <FaMicrophone />
        </Button>
      )}

      {recorderState === RecorderState.RECORDING && (
        <Button
          className="rounded-3xl bg-red-500 hover:bg-red-400"
          onClick={() => {
            recorder.stop();
            setRecorderState(RecorderState.FINISHED);
            console.log("recorded blob at", audio);
          }}
        >
          <FaStop />
        </Button>
      )}

      {recorderState === RecorderState.FINISHED && (
        <>
          <Button
            onClick={async () => {
              if (audio) {
                console.log(audio);
                await audio.play();
              } else {
                console.log("this shouldn't happen");
              }
            }}
          >
            Play
          </Button>

          <Button
            onClick={() => {
              console.log("reset recording");
              setRecorderState(RecorderState.READY);
            }}
          >
            Reset
          </Button>
        </>
      )}

      <Button
        onClick={() => {
          console.log("clicked submit");
        }}
      >
        Submit
      </Button>
    </>
  );
}
