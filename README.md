# WebRTC - SIP Gateway Project
## By Jomi Ruiz

### What Is this Project?
- Create a small platform that will allow a web-browsing client to talk to a SIP user
- Work flow looks like this
    - User accesses a React Frontend that will communication with a backend server
    - This backend server will be a "SIP-WebRTC" Gateway, converting their packets to SIP Signaling
    - In short, it will convert all WebRTC signaling to SIP signaling to connect SIP & WebRTC clients

### Motivation for the Project
- Mainly just boredom LOL
- I work in Telecom & understand a lot about SIP signaling, and wanted to learn more about Real Time Packet Processing
- Hence, why I wanted to learn this

### Tech Stack
- Frontend will use:
    - Vite
    - React
    - WebRTC Framework
- Backend will use:
    - Go
    - WebRTC Framework (Pion WebRTC)
    - WebSockets
- Build System will use:
    - Docker
    - Kubernetes (hopefully later in the future)

### Tracking Progress
- Everything will be tracked using a Github Issues Board
- We have 8 Milestones to work towards
    - #1 Run a WebRTC Call
    - #2 Backend as a Middle-Man Integration for WebRTC
    - #3 Backend as a Middle-Man Integration for SIP
    - #4 Signal Processing & Conversion between SIP & WebRTC
    - #5 Nat Traversals & Codec Support
    - #6 Security
    - #7 Call State Machine
    - #8 Observation