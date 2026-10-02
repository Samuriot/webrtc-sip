import './App.css';
import { useEffect, useRef } from 'react';

// What standard call flow will look like?
// 1. GetUserMedia()
// 2. Create RTCPeerConnection()
// 3. Add microphone stream to the peer connection
// 4. Create an offer and set it as local description
// 5. Send the offer to the signaling server
// 6. Receive an answer from the signaling server and set it as remote description then do steps 1-5

function App() {
  const remoteAudio = useRef<HTMLAudioElement>(null);

  // will run once at component mount
  useEffect(() => {
    const peerConnection = new RTCPeerConnection();

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((microphoneStream) => {
        // initializing microphone stream and adding it to the peer connection
        microphoneStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, microphoneStream);
        });
      }
    );

    // receive audio tracks from the remote peer and play them in the audio element
    peerConnection.ontrack = (event) => {
      if (remoteAudio.current) {
        remoteAudio.current.srcObject = event.streams[0];
      }
    };

    return () => peerConnection.close();
  }, []);

  return (
    <div>
      <h1>WebRTC</h1>
      <p>WebRTC - SIP Gateway</p>
      <audio ref={remoteAudio} autoPlay />
    </div>
  )
}

export default App
