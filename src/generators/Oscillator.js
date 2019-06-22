const Oscillator = (waveType, freq, audioCtx) => {
    const osc = audioCtx.createOscillator();
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.connect(audioCtx.destination);
    return osc;
};

export default Oscillator;