"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface UseYouTubePlayerArgs {
  videoId: string;
  onEnded: () => void;
  /** Fired when the current video ID fails to load or play (invalid, private, embed-disabled...). */
  onError?: () => void;
}

export function useYouTubePlayer({
  videoId,
  onEnded,
  onError,
}: UseYouTubePlayerArgs) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errored, setErrored] = useState(false);

  const currentVideoIdRef = useRef(videoId);
  const wantsPlayRef = useRef(false);

  // Load the IFrame API script once and construct the player.
  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled || !containerRef.current || playerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        videoId: currentVideoIdRef.current,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            setIsReady(true);
            setDuration(playerRef.current.getDuration() || 0);
          },
          onStateChange: (event: any) => {
            if (cancelled) return;
            const YT = window.YT;
            if (event.data === YT.PlayerState.PLAYING) {
              setErrored(false);
              setIsPlaying(true);
              setDuration(playerRef.current.getDuration() || 0);
            } else if (event.data === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
            if (event.data === YT.PlayerState.ENDED) {
              setIsPlaying(false);
              onEndedRef.current();
            }
          },
          // Fires for: 2 = invalid video id, 5 = HTML5 player error,
          // 100 = video not found/removed, 101 / 150 = embedding disabled.
          onError: () => {
            if (cancelled) return;
            setIsPlaying(false);
            setErrored(true);
            onErrorRef.current?.();
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existing = document.getElementById("youtube-iframe-api");
      if (!existing) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the requested track changes, load it into the existing player.
  useEffect(() => {
    currentVideoIdRef.current = videoId;
    const player = playerRef.current;
    if (!isReady || !player) return;
    setCurrentTime(0);
    setDuration(0);
    setErrored(false);
    if (wantsPlayRef.current) {
      player.loadVideoById(videoId);
    } else {
      player.cueVideoById(videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, isReady]);

  // Poll playback position while playing.
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      setCurrentTime(player.getCurrentTime() || 0);
      const d = player.getDuration();
      if (d) setDuration(d);
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = useCallback(() => {
    wantsPlayRef.current = true;
    playerRef.current?.playVideo?.();
  }, []);

  const pause = useCallback(() => {
    wantsPlayRef.current = false;
    playerRef.current?.pauseVideo?.();
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo?.(seconds, true);
    setCurrentTime(seconds);
  }, []);

  return {
    containerRef,
    isReady,
    isPlaying,
    currentTime,
    duration,
    errored,
    play,
    pause,
    seekTo,
  };
}
