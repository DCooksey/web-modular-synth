import React from "react";
import "./App.css";
import WaveGenerator from "./synth/WaveGenerator";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const App = () => (
    <div className="App">
        <header className="App-header">
            <WaveGenerator audioCtx={audioCtx} />
        </header>
    </div>
);

export default App;
