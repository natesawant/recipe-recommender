import { useEffect, useState } from "react";


export default function useAudioRecorder() {
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [file, setFile] = useState<File>();

    let chunks: Blob[] = [];

    const reset = () => {
        setAudio(undefined);
        setFile(undefined);
        chunks = []
    }

    useEffect(() => {
        const createStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({audio: true})
                const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
                recorder.ondataavailable = (event) => {
                    chunks.push(event.data)
                }
                recorder.onstart = () => {
                    setAudio(undefined)
                }
                recorder.onstop = () => {
                    const blob = new Blob(chunks);
                    setAudio(new Audio(URL.createObjectURL(blob)))
                    setFile(new File([blob], 'current_audio.webm'));

                    chunks = []
                }
                setRecorder(recorder)
            } catch (e) {
                console.log("Could not create media stream", e)
            }
        }

        createStream();
    }, [])

    return { recorder, audio, file, reset };
}