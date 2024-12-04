import { Button } from "./ui/button";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import {
  FaArrowRotateLeft,
  FaMicrophone,
  FaPause,
  FaPlay,
  FaStop,
} from "react-icons/fa6";

enum RecorderState {
  SETTING_UP,
  READY,
  RECORDING,
  FINISHED,
}

export default function AudioRecorder({
  handleSubmit,
  loading,
}: {
  handleSubmit: (file: File) => void;
  loading: boolean;
}) {
  const { recorder, audio, file, reset } = useAudioRecorder();
  const [recorderState, setRecorderState] = useState<RecorderState>(
    RecorderState.SETTING_UP
  );
  const [audioPlaying, setAudioPlaying] = useState(false);

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
  console.log("encoded:", file);

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
                if (audioPlaying) {
                  await audio.pause();
                  audio.currentTime = 0;
                  setAudioPlaying(false);
                } else {
                  await audio.play();
                  setAudioPlaying(true);
                }
              } else {
                console.error("No audio element found!");
              }
            }}
          >
            {audioPlaying ? <FaPause /> : <FaPlay />}
          </Button>

          <Button
            onClick={() => {
              reset();
              setRecorderState(RecorderState.READY);
              setAudioPlaying(false);
            }}
          >
            <FaArrowRotateLeft />
          </Button>
        </>
      )}

      <Button
        disabled={file === undefined}
        loading={loading}
        onClick={() => {
          if (file) {
            handleSubmit(file);
          }
        }}
      >
        Submit
      </Button>
    </>
  );
}
