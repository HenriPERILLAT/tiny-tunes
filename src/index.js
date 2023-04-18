import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Service from './Service';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';
import './styles.css';
import PianoResponse from './PianoResponse';
import Image from './img/Logo.png';

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

function App() {
  return (
    <div>
      <header class="container">
        <div class="header-left">
          <img src={Image} />
          <p class="header-title">Tiny tunes</p>
          <a href="">Description</a>
        </div>
        <div class="header-right">
          <p class="log-in-button">Log In</p>
          <span></span>
        </div>
      </header>
      <section class="container">

        <PianoResponse />
        <div className="mt-5">
          <BasicPiano />
        </div>
      </section>


      {/* <div className="mt-5">
        <p>
          Responsive piano which resizes to container's width. Try resizing the
          window!
        </p>
        <ResponsivePiano />
      </div>

      <div className="mt-5">
        <p>Piano with custom styling - see styles.css</p>
        <ResponsivePiano className="PianoDarkTheme" />
      </div> */}
    </div>
  );
}

function BasicPiano() {
  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <Piano
          noteRange={noteRange}
          width={1100}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
          keyboardShortcuts={keyboardShortcuts}
        />
      )}
    />
  );
}

function ResponsivePiano(props) {
  return (
    <DimensionsProvider>
      {({ containerWidth, containerHeight }) => (
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <Piano
              noteRange={noteRange}
              width={containerWidth}
              playNote={playNote}
              stopNote={stopNote}
              disabled={isLoading}
              {...props}
            />
          )}
        />
      )}
    </DimensionsProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
