/**
 * AudioWorkletProcessor pentru Gemini Live API
 * Rulează pe un thread separat pentru procesare audio optimizată
 */
class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    // Ia primul canal audio de la intrare
    const input = inputs[0];
    if (input && input.length > 0) {
      const inputChannelData = input[0];
      if (inputChannelData && inputChannelData.length > 0) {
        // Trimite datele audio brute (Float32Array) către thread-ul principal
        this.port.postMessage(inputChannelData);
      }
    }
    
    // Return true pentru a menține procesorul activ
    return true;
  }
}

// Înregistrează procesorul cu numele 'pcm-processor'
registerProcessor('pcm-processor', PCMProcessor);
