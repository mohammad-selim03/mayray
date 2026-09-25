"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimateIn } from "../ui/AnimateIn";
import type { HomeVoiceAgentsContent } from "../../lib/cms/schema/documents/pages/home";

const CARD_BACKGROUNDS = [
  "#FF8B66",
  "#FF8B66",
  "#FF8B66",
  "#FF8B66",
];

const PROGRESS_DURATION_SEC = 24;

function formatTime(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export const VoiceAgents = ({ content }: { content: HomeVoiceAgentsContent }) => {
  const { title: headline, points } = content;

  const scenarios = useMemo(
    () =>
      content.agents.map((agent, i) => ({
        id: `agent-${i}`,
        tag: agent.tag,
        title: agent.title,
        description: agent.body,
        video: agent.video?.url ?? "",
        audio: agent.audio?.url ?? "",
      })),
    [content.agents]
  );

  const [selectedId, setSelectedId] = useState(scenarios[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardElementsRef = useRef(new Map<string, HTMLElement>());
  const selectedIdRef = useRef(selectedId);
  const programmaticScrollUntilRef = useRef(0);

  const selectedScenario = useMemo(
    () =>
      scenarios.find((sc: (typeof scenarios)[number]) => sc.id === selectedId) ??
      scenarios[0],
    [scenarios, selectedId]
  );

  const durationSeconds =
    audioDuration > 0 ? audioDuration : PROGRESS_DURATION_SEC;
  const elapsedSeconds = (progress / 100) * durationSeconds;

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    if (scenarios.length === 0) return;
    setSelectedId((current) => {
      if (scenarios.some((sc: (typeof scenarios)[number]) => sc.id === current))
        return current;
      return scenarios[0].id;
    });
  }, [scenarios]);

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!selectedScenario?.audio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      }
      setAudioDuration(0);
      setProgress(0);
      return;
    }

    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.preload = "auto";

    const src = selectedScenario.audio;
    if (audio.getAttribute("src") !== src) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = src;
      setAudioDuration(0);
      setProgress(0);
    }

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0)
        setAudioDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0)
        setProgress(Math.min((audio.currentTime / audio.duration) * 100, 100));
    };
    const handleEnded = () => {
      setProgress(100);
      setIsPlaying(false);
    };
    const handleError = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [selectedScenario?.id, selectedScenario?.audio]);

  useEffect(() => {
    setProgress(0);
    stopPlayback();
  }, [selectedScenario?.id, stopPlayback]);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !selectedScenario?.audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (progress >= 100 || audio.ended) {
      audio.currentTime = 0;
      setProgress(0);
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(true);
    }
  }, [isPlaying, progress, selectedScenario?.audio]);

  const scrollToScenario = useCallback((id: string) => {
    setSelectedId(id);
    setProgress(0);
    stopPlayback();
    const scroller = scrollerRef.current;
    const card = cardElementsRef.current.get(id);
    if (!scroller || !card) return;
    const targetLeft =
      card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
    programmaticScrollUntilRef.current = Date.now() + 1000;
    scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [stopPlayback]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < programmaticScrollUntilRef.current) return;
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.scenarioId;
          if (id) ratios.set(id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId && bestRatio >= 0.6 && bestId !== selectedIdRef.current) {
          setSelectedId(bestId);
          setProgress(0);
          stopPlayback();
        }
      },
      { root: scroller, threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    cardElementsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scenarios, stopPlayback]);

  return (
    <section
      id="voice-agents"
      className="mx-auto w-full max-w-[1420px] px-4 pb-16 pt-14 text-[#252835] sm:pb-20 sm:pt-16 md:px-8 md:pb-24 lg:px-10"
    >
      <AnimateIn>
        <h2 className="text-center text-[clamp(2.4rem,4.2vw,4.1rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
          {headline}
        </h2>
      </AnimateIn>
      {points.length > 0 && (
        <AnimateIn delay={0.15}>
          <ul className="mx-auto mt-6 max-w-[830px] list-disc space-y-1 pl-5 text-center text-[clamp(1.03rem,1.45vw,1.2rem)] font-medium leading-[1.4] text-[#595d72] sm:text-left">
            {points.map((point, i) => (
              <li key={i}>{point.text}</li>
            ))}
          </ul>
        </AnimateIn>
      )}

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Desktop cards */}
        <div className="hidden h-[28rem] items-stretch gap-6 xl:flex">
          {scenarios.map(
            (scenario: (typeof scenarios)[number], index: number) => {
              const isActive = scenario.id === selectedId;

              return (
                <motion.div
                  key={scenario.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedId(scenario.id);
                    setProgress(0);
                    stopPlayback();
                  }}
                  onFocus={() => {
                    setSelectedId(scenario.id);
                    setProgress(0);
                    stopPlayback();
                  }}
                  onMouseEnter={() => {
                    setSelectedId(scenario.id);
                    setProgress(0);
                    stopPlayback();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(scenario.id);
                      setProgress(0);
                      stopPlayback();
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`group relative overflow-hidden rounded-[26px] transition-all duration-500 ease-out ${isActive
                    ? "flex-[2.2] min-w-[26rem] ring-2 ring-white/45"
                    : "flex-[0.8] min-w-[9rem] hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(24,31,44,0.2)]"
                    }`}
                >
                  {isActive ? (
                    <div className="flex h-full flex-row">
                      <motion.video
                        className="h-full w-[33.2%] min-w-[208px] object-cover object-center"
                        initial={{ opacity: 0.8, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={scenario.id}
                        transition={{ duration: 0.45 }}
                        src={scenario.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />

                      <div
                        className="flex min-w-0 flex-1 flex-col justify-between px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7"
                        style={{
                          background:
                            CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
                        }}
                      >
                        <div className="min-w-0">
                          <h3 className="min-w-0 text-[clamp(1.7rem,1.9vw,2.2rem)] font-black leading-[1.05] tracking-[-0.04em] break-words sm:mt-5">
                            {scenario.title}
                          </h3>
                          <p className="mt-4 min-w-0 max-w-[704px] text-[clamp(0.98rem,0.75vw,1.18rem)] leading-[1.5] break-words text-[#353a4b]">
                            {scenario.description}
                          </p>
                        </div>

                        <div className="mt-6 flex min-w-0 flex-col flex-wrap items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4 md:gap-5">
                          <div className="flex h-14 min-w-0 flex-1 items-center rounded-[1.5rem] bg-white px-3 sm:h-16 sm:rounded-4xl sm:px-4">
                            <button
                              aria-label={
                                isPlaying ? "Pause voice preview" : "Play voice preview"
                              }
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#e8e6ee] text-[#2e3242] shadow-[0_4px_10px_rgba(24,28,42,0.12)] sm:h-12 sm:w-12 sm:rounded-[15px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePlayback();
                              }}
                              disabled={!scenario.audio}
                              title={scenario.audio ? undefined : "Voice sample coming soon"}
                              type="button"
                            >
                              {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
                                  <rect x="6" y="4" width="4" height="16" rx="1" />
                                  <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                            </button>

                            <div className="ml-3 min-w-0 flex-1 sm:ml-5">
                              <div className="h-[3px] rounded-full bg-[#9f9cab]">
                                <div
                                  className="h-[3px] rounded-full bg-[#444a5e] transition-all duration-150"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <div className="mt-1 flex justify-between text-[10px] font-semibold text-[#60667a] sm:text-[11px]">
                                <span>{formatTime(elapsedSeconds)}</span>
                                <span>{formatTime(durationSeconds)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video
                        className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03]"
                        src={scenario.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,24,37,0)_35%,rgba(20,25,37,0.55)_100%)] opacity-95 transition-opacity duration-400" />
                    </>
                  )}
                </motion.div>
              );
            }
          )}
        </div>

        {/* Mobile cards */}
        <div className="xl:hidden">
          <div
            aria-label="Voice agent scenarios"
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:gap-5 md:-mx-8 md:gap-6 md:px-8 lg:-mx-10 lg:px-10"
            ref={scrollerRef}
          >
            {scenarios.map(
              (scenario: (typeof scenarios)[number], index: number) => {
                const isActive = scenario.id === selectedId;

                if (isActive) {
                  return (
                    <motion.article
                      className="flex min-h-[31rem] w-[min(86vw,27rem)] shrink-0 snap-center flex-col overflow-hidden rounded-[26px] border border-white/45 shadow-[0_18px_34px_rgba(24,31,44,0.16)] transition-all duration-500 sm:min-h-[30rem] sm:flex-row lg:w-[32rem] xl:w-[36rem]"
                      key={scenario.id}
                      ref={(el: HTMLElement | null) => {
                        if (el) {
                          el.dataset.scenarioId = scenario.id;
                          cardElementsRef.current.set(scenario.id, el);
                        } else {
                          cardElementsRef.current.delete(scenario.id);
                        }
                      }}
                      style={{
                        background:
                          CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
                      }}
                    >
                      <motion.video
                        className="h-44 w-full shrink-0 object-cover object-top sm:h-full sm:w-[36%] sm:object-center"
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0.8, scale: 1.04 }}
                        key={scenario.id}
                        src={scenario.video}
                        transition={{ duration: 0.45 }}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
                        <div className="min-w-0">
                          <span className="inline-flex w-fit rounded-[14px] bg-[#35384a] px-4 py-1.5 text-[clamp(0.85rem,0.9vw,1.05rem)] font-semibold text-[#a89bc2] sm:rounded-[18px] sm:px-5 sm:py-2">
                            {scenario.tag}
                          </span>
                          <h3 className="mt-3 break-words text-[clamp(1.7rem,7vw,2.3rem)] font-black leading-[1.05] tracking-[-0.04em] sm:mt-4 sm:text-[clamp(1.6rem,1.9vw,2.4rem)]">
                            {scenario.title}
                          </h3>
                          <p className="mt-3 break-words text-[clamp(0.95rem,1.1vw,1.12rem)] leading-[1.5] text-[#353a4b]">
                            {scenario.description}
                          </p>
                        </div>

                        <div className="flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                          <div className="flex h-14 min-w-0 flex-1 items-center rounded-[1.5rem] bg-white px-3 sm:h-12 sm:rounded-4xl sm:px-4">
                            <button
                              aria-label={
                                isPlaying ? "Pause voice preview" : "Play voice preview"
                              }
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white text-[#2e3242] sm:h-12 sm:w-12 sm:rounded-[15px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePlayback();
                              }}
                              disabled={!scenario.audio}
                              title={scenario.audio ? undefined : "Voice sample coming soon"}
                              type="button"
                            >
                              {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
                                  <rect x="6" y="4" width="4" height="16" rx="1" />
                                  <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M5.25 5.65308C5.25 4.79708 6.167 4.25508 6.917 4.66708L18.457 11.0141C18.6336 11.1111 18.781 11.2538 18.8836 11.4273C18.9862 11.6007 19.0403 11.7986 19.0403 12.0001C19.0403 12.2016 18.9862 12.3994 18.8836 12.5729C18.781 12.7463 18.6336 12.889 18.457 12.9861L6.917 19.3331C6.74569 19.4273 6.55278 19.4752 6.35731 19.4721C6.16184 19.469 5.97054 19.4151 5.80227 19.3155C5.634 19.216 5.49457 19.0744 5.39773 18.9045C5.30089 18.7347 5.24997 18.5426 5.25 18.3471V5.65308Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>

                            <div className="ml-3 min-w-0 flex-1 mt-5">
                              <div className="h-[3px] rounded-full bg-[#9f9cab]">
                                <div
                                  className="h-[3px] rounded-full bg-[#444a5e] transition-all duration-150"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <div className="mt-1 flex justify-between text-[10px] font-semibold text-[#60667a] sm:text-[11px]">
                                <span>{formatTime(elapsedSeconds)}</span>
                                <span>{formatTime(durationSeconds)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                }

                return (
                  <motion.button
                    aria-label={`Preview ${scenario.title} voice agent`}
                    className="group relative min-h-[31rem] w-[min(64vw,15.5rem)] shrink-0 snap-center overflow-hidden rounded-[26px] border border-white/35 text-left shadow-[0_10px_25px_rgba(26,33,45,0.13)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(24,31,44,0.2)] focus-visible:ring-2 focus-visible:ring-white/70 sm:min-h-[30rem]"
                    key={scenario.id}
                    onClick={() => scrollToScenario(scenario.id)}
                    onFocus={() => {
                      setSelectedId(scenario.id);
                      setProgress(0);
                      stopPlayback();
                    }}
                    ref={(el: HTMLElement | null) => {
                      if (el) {
                        el.dataset.scenarioId = scenario.id;
                        cardElementsRef.current.set(scenario.id, el);
                      } else {
                        cardElementsRef.current.delete(scenario.id);
                      }
                    }}
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <video
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03]"
                      src={scenario.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,24,37,0)_30%,rgba(20,25,37,0.72)_100%)]" />
                    <div className="absolute right-[23%] bottom-10"> 
                      <span className="flex flex-col gap-2 p-5 bg-white w-[130px] rounded-[26px] text-center">
                        <span className="flex w-full items-center justify-center rounded-full bg-white/15 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M2.25 6.75C2.25 15.034 8.966 21.75 17.25 21.75H19.5C20.0967 21.75 20.669 21.5129 21.091 21.091C21.5129 20.669 21.75 20.0967 21.75 19.5V18.128C21.75 17.612 21.399 17.162 20.898 17.037L16.475 15.931C16.035 15.821 15.573 15.986 15.302 16.348L14.332 17.641C14.05 18.017 13.563 18.183 13.122 18.021C11.4849 17.4191 9.99815 16.4686 8.76478 15.2352C7.53141 14.0018 6.58087 12.5151 5.979 10.878C5.817 10.437 5.983 9.95 6.359 9.668L7.652 8.698C8.015 8.427 8.179 7.964 8.069 7.525L6.963 3.102C6.90214 2.85869 6.76172 2.6427 6.56405 2.48834C6.36638 2.33397 6.1228 2.25008 5.872 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V6.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>

                      </span>
                       </div>
                  </motion.button>
                );
              }
            )}
          </div>

          <div
            aria-hidden="true"
            className="mt-5 flex justify-center gap-2"
            role="presentation"
          >
            {scenarios.map((scenario: (typeof scenarios)[number]) => {
              const isActive = scenario.id === selectedId;
              return (
                <button
                  aria-label={`Go to ${scenario.title}`}
                  aria-pressed={isActive}
                  className={`h-2 rounded-full transition-all duration-300 ${isActive
                    ? "w-6 bg-[#242734]"
                    : "w-2 bg-[#c6c9d4] hover:bg-[#a9adbd]"
                    }`}
                  key={`dot-${scenario.id}`}
                  onClick={() => scrollToScenario(scenario.id)}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
