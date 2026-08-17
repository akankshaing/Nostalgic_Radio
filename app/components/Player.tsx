"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/tracks";
import { formatTime } from "@/lib/format-time";
import { useYouTubePlayer } from "@/lib/use-youtube-player";
import { Vinyl } from "./Vinyl";
import { SeekBar } from "./SeekBar";
import { Transport } from "./Transport";
import { ShuffleButton } from "./ShuffleButton";
import { AllSongsButton } from "./AllSongsButton";
import { AllSongsPanel } from "./AllSongsPanel";

export function Player() {
  const [index, setIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const historyRef = useRef<number[]>([]);
  const brokenStreakRef = useRef(0);

  const track = tracks[index];

  const goNext = useCallback(() => {
    setIndex((prev) => {
      historyRef.current.push(prev);

      if (tracks.length <= 1) {
        return prev;
      }

      if (shuffle) {
        let next = prev;

        while (next === prev) {
          next = Math.floor(Math.random() * tracks.length);
        }

        return next;
      }

      return (prev + 1) % tracks.length;
    });
  }, [shuffle]);

  const goPrev = useCallback(() => {
    setIndex((prev) => {
      if (shuffle && historyRef.current.length > 0) {
        return historyRef.current.pop()!;
      }

      return (prev - 1 + tracks.length) % tracks.length;
    });
  }, [shuffle]);

  const playTrack = useCallback((i: number) => {
    setIndex((prev) => {
      if (i === prev) {
        return prev;
      }

      historyRef.current.push(prev);
      return i;
    });

    brokenStreakRef.current = 0;
    setBlocked(false);
    setShowAllSongs(false);
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle((s) => !s);
    historyRef.current = [];
  }, []);

  const handleError = useCallback(() => {
    brokenStreakRef.current += 1;

    // Stop after checking the entire playlist
    // without finding a playable track.
    if (brokenStreakRef.current > tracks.length) {
      setBlocked(true);
      return;
    }

    goNext();
  }, [goNext]);

  const {
    containerRef,
    isPlaying,
    currentTime,
    duration,
    errored,
    play,
    pause,
    seekTo,
  } = useYouTubePlayer({
    videoId: track.youtubeId,
    onEnded: goNext,
    onError: handleError,
  });

  useEffect(() => {
    if (isPlaying) {
      brokenStreakRef.current = 0;
    }
  }, [isPlaying]);

  const handleManualNext = useCallback(() => {
    brokenStreakRef.current = 0;
    setBlocked(false);
    goNext();
  }, [goNext]);

  const handleManualPrev = useCallback(() => {
    brokenStreakRef.current = 0;
    setBlocked(false);
    goPrev();
  }, [goPrev]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return (
    <div className="pointer-events-auto w-full max-w-xl px-4">
      {/* Hidden YouTube iframe target */}
      <div
        ref={containerRef}
        className="hidden"
        aria-hidden="true"
      />

      {/* =========================================================
          DESKTOP PLAYER
          ========================================================= */}
      <div className="glass hidden w-full items-center gap-3 rounded-full p-3 pr-4 sm:flex">
        <Vinyl
          isPlaying={isPlaying}
          size={80}
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[var(--color-ink)]">
            {track.title}
          </p>

          <p className="truncate text-[12.5px] text-[var(--color-ink)]/78">
            {blocked
              ? "No playable track found in this playlist"
              : errored
                ? "Unavailable — skipping…"
                : track.artist}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="tabular text-[10.5px] text-[var(--color-ink)]/70">
              {formatTime(currentTime)}
            </span>

            <SeekBar
              currentTime={currentTime}
              duration={duration}
              onSeek={seekTo}
            />

            <span className="tabular text-[10.5px] text-[var(--color-ink)]/70">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <ShuffleButton
          active={shuffle}
          onToggle={toggleShuffle}
        />

        <Transport
          isPlaying={isPlaying}
          onPrev={handleManualPrev}
          onToggle={toggle}
          onNext={handleManualNext}
        />

        <AllSongsButton
          onClick={() => setShowAllSongs(true)}
        />
      </div>

      {/* =========================================================
          MOBILE PLAYER
          Compact horizontal layout
          ========================================================= */}
      <div className="glass flex w-full flex-col gap-2 rounded-2xl p-3 sm:hidden">
        {/* Track information */}
        <div className="flex w-full items-center gap-3">
          <Vinyl
            isPlaying={isPlaying}
            size={64}
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-[var(--color-ink)]">
              {track.title}
            </p>

            <p className="truncate text-[11.5px] text-[var(--color-ink)]/78">
              {blocked
                ? "No playable track found in this playlist"
                : errored
                  ? "Unavailable — skipping…"
                  : track.artist}
            </p>

            {/* Seek bar */}
            <div className="mt-1 flex w-full items-center gap-1.5">
              <span className="tabular shrink-0 text-[9px] text-[var(--color-ink)]/70">
                {formatTime(currentTime)}
              </span>

              <SeekBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seekTo}
              />

              <span className="tabular shrink-0 text-[9px] text-[var(--color-ink)]/70">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <ShuffleButton
            active={shuffle}
            onToggle={toggleShuffle}
            size="lg"
          />

          <Transport
            isPlaying={isPlaying}
            onPrev={handleManualPrev}
            onToggle={toggle}
            onNext={handleManualNext}
            size="lg"
          />

          <AllSongsButton
            onClick={() => setShowAllSongs(true)}
            size="lg"
          />
        </div>
      </div>

      {/* =========================================================
          ALL SONGS PANEL
          ========================================================= */}
      {showAllSongs && (
        <AllSongsPanel
          currentIndex={index}
          onSelect={playTrack}
          onClose={() => setShowAllSongs(false)}
        />
      )}
    </div>
  );
}
