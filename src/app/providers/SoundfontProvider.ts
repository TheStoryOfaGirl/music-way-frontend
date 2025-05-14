import React from 'react';
import Soundfont, { InstrumentName } from 'soundfont-player';

interface SoundfontProviderProps {
  instrumentName: string;
  hostname: string;
  format?: 'mp3' | 'ogg';
  soundfont?: 'MusyngKite' | 'FluidR3_GM';
  audioContext: AudioContext;
  render: (args: {
    isLoading: boolean;
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    stopAllNotes: () => void;
  }) => React.ReactNode;
}

interface SoundfontProviderState {
  activeAudioNodes: Record<number, AudioBufferSourceNode | null>;
  instrument: any; 
}

class SoundfontProvider extends React.Component<SoundfontProviderProps, SoundfontProviderState> {
  static defaultProps: Partial<SoundfontProviderProps> = {
    format: 'mp3',
    soundfont: 'MusyngKite',
    instrumentName: 'acoustic_grand_piano',
  };

  constructor(props: SoundfontProviderProps) {
    super(props);
    this.state = {
      activeAudioNodes: {},
      instrument: null,
    };
  }

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName);
  }

  componentDidUpdate(prevProps: SoundfontProviderProps) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.loadInstrument(this.props.instrumentName);
    }
  }

  loadInstrument = (instrumentName: string): void => {
    this.setState({
      instrument: null,
    });

    Soundfont.instrument(this.props.audioContext, instrumentName as InstrumentName, {
      format: this.props.format,
      soundfont: this.props.soundfont,
      nameToUrl: (name: string, soundfont: string, format: string) => {
        return `${this.props.hostname}/${soundfont}/${name}-${format}.js`;
      },
    }).then((instrument) => {
      this.setState({
        instrument,
      });
    }).catch((error: Error) => {
      console.error('Error loading instrument:', error);
    });
  };

  playNote = (midiNumber: number): void => {
    this.props.audioContext.resume().then(() => {
      if (!this.state.instrument) return;

      const audioNode = this.state.instrument.play(midiNumber.toString());
      this.setState(prevState => ({
        activeAudioNodes: {
          ...prevState.activeAudioNodes,
          [midiNumber]: audioNode,
        },
      }));
    });
  };

  stopNote = (midiNumber: number): void => {
    this.props.audioContext.resume().then(() => {
      const audioNode = this.state.activeAudioNodes[midiNumber];
      if (!audioNode) return;

      audioNode.stop();
      this.setState(prevState => ({
        activeAudioNodes: {
          ...prevState.activeAudioNodes,
          [midiNumber]: null,
        },
      }));
    });
  };

  stopAllNotes = (): void => {
    this.props.audioContext.resume().then(() => {
      Object.values(this.state.activeAudioNodes).forEach(node => {
        if (node) {
          node.stop();
        }
      });
      this.setState({
        activeAudioNodes: {},
      });
    });
  };

  render() {
    return this.props.render({
      isLoading: !this.state.instrument,
      playNote: this.playNote,
      stopNote: this.stopNote,
      stopAllNotes: this.stopAllNotes,
    });
  }
}

export default SoundfontProvider;