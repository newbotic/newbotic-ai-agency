class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input.length > 0) {
      const inputChannelData = input[0];
      if (inputChannelData && inputChannelData.length > 0) {
        this.port.postMessage(inputChannelData);
      }
    }
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
