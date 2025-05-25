import SoundfontProvider from "./../../../app/providers/SoundfontProvider";
import "react-piano/dist/styles.css";
import {
  Piano as ReactPiano,
  KeyboardShortcuts,
  MidiNumbers,
} from "react-piano";
import "./PianoCustom.css";
import { Dispatch, SetStateAction } from "react";
import { midiToNote } from "@utils";

interface PianoProps {
  setNotes?: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
  onPlayNote?: (noteName: string) => void;
  playNoteFunction?: (fn: (midiNumber: number) => void) => void;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
 
export const PianoCustom = ({
  setNotes,
  disabled,
  onPlayNote,
  playNoteFunction,
}: PianoProps) => {
 const audioContext = new (window.AudioContext || window.webkitAudioContext)(); 
  const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";
  const handlePlayNote = (midiNumber: number) => {
    const noteName = midiToNote(midiNumber);
    if (setNotes) {
      setNotes((prev) => [...prev, noteName]);
    }
    if (onPlayNote) {
      onPlayNote(noteName);
    }
  };

  const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("c6"),
  };
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: MidiNumbers.fromNote("c4"),
    lastNote: MidiNumbers.fromNote("c6"),
    keyboardConfig: [...KeyboardShortcuts.HOME_ROW],
  });
  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => {
        if (playNoteFunction) {
          playNoteFunction((midiNumber) => playNote(midiNumber));
        }
        return (
          <ReactPiano
            noteRange={noteRange}
            width={900}
            playNote={(midiNumber: number) => {
              playNote(midiNumber);
              handlePlayNote(midiNumber);
            }}
            stopNote={stopNote}
            disabled={isLoading || disabled}
            keyboardShortcuts={keyboardShortcuts}
            renderNoteLabel={({ midiNumber }: { midiNumber: number }) => {
              if (midiNumber === 60) {
                return "до";
              }
              return null;
            }}
          />
        );
      }}
    />
  );
};
