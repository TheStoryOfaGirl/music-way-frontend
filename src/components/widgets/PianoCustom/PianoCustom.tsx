import SoundfontProvider from './../../../app/providers/SoundfontProvider';
import 'react-piano/dist/styles.css';
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import './PianoCustom.css'

interface PianoProps {
  initialOctave?: number;
}

export const PianoCustom = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';
  
  const noteRange = {
    first: MidiNumbers.fromNote('c2'),
    last: MidiNumbers.fromNote('c5'),
  };
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: MidiNumbers.fromNote('c3'),
    lastNote:  MidiNumbers.fromNote('c5'),
    keyboardConfig: [...KeyboardShortcuts.HOME_ROW]
  });
  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <ReactPiano
          noteRange={noteRange}
          width={900}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
          keyboardShortcuts={keyboardShortcuts}
          renderNoteLabel={({ midiNumber }: {midiNumber: number}) => {
            if (midiNumber === 48) {
              return 'до'
            }
            return null
          }}
        />
      )}
    />
  );
};
