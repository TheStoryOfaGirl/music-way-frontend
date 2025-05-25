import { useEffect } from "react";
import ABCJS from "abcjs";
import "./SheetMusic.css";

interface SheetMusicProps {
  notes: string[];
  totalCountNotes: number;
}

const internationalToAbc = (note: string): string => {
  const match = note.match(/^([A-Ga-g])([#b])?(\d+)?$/);
  if (!match) return note;

  const [, pitch, accidental, octaveStr] = match;
  const octave = octaveStr ? parseInt(octaveStr) : 4;

  let abcPitch = pitch;
  if (accidental === "#") abcPitch = `^${abcPitch}`;
  if (accidental === "b") abcPitch = `_${abcPitch}`;

  if (octave === 5) abcPitch = abcPitch.toLowerCase();
  if (octave === 6) abcPitch = `${abcPitch.toLowerCase()}'`;
  if (octave === 3) abcPitch = `${abcPitch},`;

  return abcPitch;
};

const getPause = (notes: string[], countNotes: number) => {
  return "x".repeat(countNotes - notes.length);
};

export const SheetMusic = ({ notes, totalCountNotes }: SheetMusicProps) => {
  useEffect(() => {
    const abcNotation = `L:1/4\n${notes.map(internationalToAbc).join(" ")}${getPause(notes, totalCountNotes)} |]`;
    ABCJS.renderAbc("sheet-music", abcNotation, {
      scale: 1.7,
      staffwidth: 770,
    });
  }, [notes, totalCountNotes]);

  return <div id="sheet-music"></div>;
};
