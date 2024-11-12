import { useEffect, useState } from "react";


export default function useAudioRecorder() {
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement>();

    let chunks: Blob[] = [];

    useEffect(() => {
        const createStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({audio: true})
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    chunks.push(event.data)
                }
                recorder.onstart = () => {
                    setAudio(undefined)
                }
                recorder.onstop = () => {
                    setAudio(new Audio(URL.createObjectURL(new Blob(chunks))))
                    chunks = []
                }
                setRecorder(recorder)
            } catch {
                console.log("Could not create media stream")
            }
        }

        createStream();
    }, [])

    return { recorder, audio };
}