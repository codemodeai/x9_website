"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

/**
 * Masked line reveal — the treatment gsap.com uses on its own headings. Text is
 * split into lines, each line wrapped in an overflow-hidden mask, and the
 * characters (or lines) slide up out of that mask on a stagger.
 *
 * Four things this has to get right, none of them optional:
 *
 * 1. SEO — the text ships in the server HTML as a real heading. The split runs
 *    client-side against existing DOM text, so crawlers and answer engines see
 *    an intact <h1>. Matters more than usual here: X9 sells SEO and LLM SEO.
 * 2. Fonts — splitting before the webfont loads measures the fallback and
 *    breaks lines in the wrong places, so we wait on document.fonts.ready.
 * 3. Screen readers — a heading chopped into <div>s per character gets read out
 *    letter by letter. `aria: "auto"` restores the original string as an
 *    aria-label and hides the fragments.
 * 4. Reduced motion — the global rule in globals.css only kills CSS animation;
 *    GSAP writes inline styles and sails straight past it, so the check has to
 *    happen here via gsap.matchMedia.
 *
 * IMPLEMENTATION NOTE: the animation is deliberately NOT created inside
 * SplitText's `onSplit` callback, which is the pattern the GSAP docs show. Doing
 * that ties the tween's lifecycle to the SplitText instance, and here it left
 * the tween killed immediately after creation — start values baked in, chars
 * frozen off-screen, zero tweens attached to the element. Creating the split and
 * the timeline as two independent steps keeps the tween under our control.
 */

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

interface SplitRevealProps {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
  /** Characters read as display type; lines are calmer and better for body copy. */
  splitBy?: "chars" | "words" | "lines";
  /** Wait for the element to scroll into view. Off for above-the-fold content. */
  scroll?: boolean;
  delay?: number;
  id?: string;
}

export function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  splitBy = "chars",
  scroll = true,
  delay = 0,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return; // leave the server-rendered text exactly as it is
      }

      // Hide before first paint so the un-split text never flashes in ahead of
      // the animation. Everything below restores it.
      gsap.set(el, { autoAlpha: 0 });

      let split: SplitText | null = null;
      let tween: gsap.core.Tween | null = null;
      let cancelled = false;

      // If fonts never resolve, the most important text on the page must not
      // stay invisible.
      const failsafe = window.setTimeout(() => gsap.set(el, { autoAlpha: 1 }), 1200);

      /*
        Splitting needs the webfont loaded, or lines break against fallback
        metrics. But `document.fonts.ready` waits for EVERY face on the page —
        21 of them here — which left the hero blank for over a second and, since
        the h1 is the LCP element, dragged LCP with it. So the wait is capped:
        whichever comes first, fonts or the deadline. The display face is
        preloaded and same-origin, so in practice fonts win.
      */
      const fontsSettled = Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, 400)),
      ]);

      void fontsSettled.then(() => {
        if (cancelled || !ref.current) return;
        window.clearTimeout(failsafe);

        split = SplitText.create(el, {
          type: "lines,words,chars",
          mask: "lines",
          aria: "auto",
        });

        const targets =
          splitBy === "chars"
            ? split.chars
            : splitBy === "words"
              ? split.words
              : split.lines;

        gsap.set(el, { autoAlpha: 1 });

        tween = gsap.fromTo(
          targets,
          { yPercent: 115 },
          {
            yPercent: 0,
            // Characters stagger fast; whole lines need room to breathe.
            duration: splitBy === "chars" ? 0.8 : 0.9,
            ease: "power3.out",
            stagger: splitBy === "chars" ? 0.014 : 0.06,
            delay,
            ...(scroll
              ? { scrollTrigger: { trigger: el, start: "top 85%", once: true } }
              : {}),
          },
        );
      });

      return () => {
        cancelled = true;
        window.clearTimeout(failsafe);
        tween?.kill();
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<never>} className={className} id={id}>
      {children}
    </Tag>
  );
}

/**
 * Plain slide-and-fade for things that are not text — buttons, cards, rules.
 * Pairs with SplitReveal so a hero resolves as one coordinated movement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  scroll = true,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scroll?: boolean;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.fromTo(
        el,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          delay,
          ...(scroll
            ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } }
            : {}),
        },
      );

      return () => {
        tween.kill();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
