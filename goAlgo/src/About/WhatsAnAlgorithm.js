import React, { useEffect } from 'react';
import './about.css';

export default function () {
  let lines = ['so...what\'s an algorithm?',
    'and why would you need one?',
    'and what does one look like?',
  ]

  useEffect(() => {
    showLines()
  }, [])


  const showLines = (altDomArray) => {
    const domLines = document.getElementsByClassName('invisible-lines');
    for (let i = 0; i < domLines.length; i++) {
      const domLine = domLines[i];
      console.log(domLine)
      setTimeout(() => {
        domLine.classList.add('line');
        domLine.hidden = false;
        if (i === domLines.length - 1) {
          setTimeout(() => {
            const exploreToggles = document.getElementById('explore');
            exploreToggles.style.display = 'flex';
            exploreToggles.style.justifyContent = 'center';
            exploreToggles.hidden = false;
          }, 3500)
        }
      }, 3300 * i)
    }
  }
  return (
    <div className='lines'>
      {lines.map((line) => {
        return <div className='invisible-lines' hidden> <p>{line}</p> </div>
      })}
      <div id='explore' hidden={true}>
        <button id='go-button'>
          <img onClick={() => window.location = '/sorting'} src='apple-touch-icon.png'></img>
        </button>
        <span>
          <p>An algorithm is a process determined by rules a computer can follow.
              The process happens for a provided group of things, or data.</p>
          <p>Perhaps your phone wants to get you to the nearest grocery store, or show you your mutual friend connections.</p>
          <p>Your phone doesn't just know how to do this. Someone taught it how to know. Someone left it a letter.</p>
          <p>That someone is a Software Engineer, and that letter is an algorithm.*</p>
          <p style={{ fontSize: '10px' }}>*Yes, it's a bit more complicated than that, but haven't we already argued
                                            enough this year? Click the logo!</p>
        </span>
      </div>
    </div>
  )
}
