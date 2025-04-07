import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import blank_img from '../images/blank.png';
import replay_img from '../images/replay_audio.png';
import play_img from '../images/play-circle.svg';
import pause_img from '../images/pause-circle.svg';

export default function AudioControl({ audioUrl }) {
  const audioRef = useRef(new Audio());
  const [previousAudio, setPreviousAudio] = useState('');
  const [audioStatus, setAudioStatus] = useState('none');

  let img_icon = play_img;
  let text = 'play audio';

  function pauseAudio() {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function setAudioElementUrl(newUrl) {
    if (audioRef.current) {
      audioRef.current.src = '';
      audioRef.current.removeAttribute('src');
    }
    audioRef.current.src = newUrl;
    audioRef.current.load();
  }

  function handleEnded() {
    if (audioUrl.shouldReplay) {
      setAudioStatus('finished');
    } else {
      if (previousAudio === '') {
        setAudioStatus('none');
      } else {
        setAudioElementUrl(previousAudio);
        audioRef.current.addEventListener('canplaythrough', () => {
          audioRef.current.pause();
        });
        setAudioStatus('finished');
      }
    }
  }

  function handleClicked() {
    switch (String(audioStatus)) {
      case 'none':
        break;
      case 'playing':
        audioRef.current.pause();
        setAudioStatus('paused');
        break;
      case 'paused':
        audioRef.current.play();
        setAudioStatus('playing');
        break;
      case 'finished':
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener('canplaythrough', () => {
          audioRef.current.play();
        });
        setAudioStatus('playing');
        break;
      default:
        console.log('Unknown status:', audioStatus);
    }
  }

  useEffect(() => {
    pauseAudio();
    setAudioElementUrl(audioUrl.url);
    audioRef.current.addEventListener('canplaythrough', () => {
      audioRef.current.play().catch((error) => console.error('Error playing audio:', error));
    });
    if (audioUrl.url === '') {
      setAudioStatus('none');
    } else {
      setAudioStatus('playing');
    }
    if (audioUrl.shouldReplay) {
      setPreviousAudio(audioUrl.url);
    }
    if (audioUrl.url === '') {
      setPreviousAudio('');
    }
  }, [audioUrl]);

  switch (String(audioStatus)) {
    case 'none':
      text = '';
      img_icon = blank_img;
      break;
    case 'playing':
      text = 'pause';
      img_icon = pause_img;
      break;
    case 'paused':
      text = 'continue';
      img_icon = play_img;
      break;
    case 'finished':
      text = 'replay';
      img_icon = replay_img;
      break;
    default:
      console.log('Unknown status:', audioStatus);
  }

  return (
    <TouchableOpacity onPress={handleClicked} style={{ alignItems: 'center' }}>
      <Image source={img_icon} style={{ width: 30, height: 30 }} />
      <Text>{text}</Text>
      <audio ref={audioRef} controls controlsList="nodownload" autoPlay style={{ display: 'none' }} onEnded={handleEnded}>
        <source src={audioUrl.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </TouchableOpacity>
  );
}
