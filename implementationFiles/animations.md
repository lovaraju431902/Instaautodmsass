'use client';
import { cn } from '@/utils/cn';
import Springer from '@/utils/springer';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { ReactElement, Ref, cloneElement, useRef } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealAnimationProps {
  children: ReactElement<{
    className?: string;
    ref?: Ref<HTMLElement>;
    'data-ns-animate'?: boolean;
  }>;
  duration?: number;
  delay?: number;
  offset?: number;
  instant?: boolean;
  start?: string;
  end?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  useSpring?: boolean;
  rotation?: number;
  animationType?: 'from' | 'to';
  className?: string;
}

const RevealAnimation = ({
  children,
  duration = 0.6,
  delay = 0,
  offset = 60,
  instant = false,
  start = 'top 90%',
  end = 'top 50%',
  direction = 'down',
  useSpring = false,
  rotation = 0,
  animationType = 'from',
  className = '',
}: RevealAnimationProps) => {
  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    // Get spring easing if useSpring is true
    const spring = useSpring ? Springer.default(0.2, 0.8) : null;

    // Force initial state
    element.style.opacity = '1';
    element.style.filter = 'blur(0)';

    // Set animation properties based on animation type
    let animationProps: gsap.TweenVars;

    if (animationType === 'to') {
      // gsap.to() - animate TO the specified values
      animationProps = {
        opacity: 1,
        filter: 'blur(0)',
        duration: duration,
        delay: delay,
        ease: useSpring && spring ? spring : 'power2.out',
      };

      // Add rotation if specified
      if (rotation !== 0) {
        animationProps.rotation = rotation;
      }
    } else {
      // gsap.from() - animate FROM the specified values to normal
      animationProps = {
        opacity: 0,
        filter: 'blur(16px)',
        duration: duration,
        delay: delay,
        ease: useSpring && spring ? spring : 'power2.out',
      };

      // Add rotation if specified
      if (rotation !== 0) {
        animationProps.rotation = rotation;
      }
    }

    // Add ScrollTrigger if not instant
    if (!instant) {
      animationProps.scrollTrigger = {
        trigger: element,
        start: start,
        end: end,
        scrub: false,
      };
    }

    // Set animation direction based on direction prop
    switch (direction) {
      case 'left':
        animationProps.x = animationType === 'from' ? -offset : 0;
        if (animationType === 'to') {
          gsap.set(element, { x: -offset });
        }
        break;
      case 'right':
        animationProps.x = animationType === 'from' ? offset : 0;
        if (animationType === 'to') {
          gsap.set(element, { x: offset });
        }
        break;
      case 'down':
        animationProps.y = animationType === 'from' ? offset : 0;
        if (animationType === 'to') {
          gsap.set(element, { y: offset });
        }
        break;
      case 'up':
      default:
        animationProps.y = animationType === 'from' ? -offset : 0;
        if (animationType === 'to') {
          gsap.set(element, { y: -offset });
        }
        break;
    }

    // Use appropriate GSAP method based on animation type
    if (animationType === 'to') {
      gsap.to(element, animationProps);
    } else {
      gsap.from(element, animationProps);
    }
  }, [duration, delay, offset, instant, start, end, direction, useSpring, rotation, animationType]);

  // Early return if children is not valid (after all hooks)
  if (!children || !React.isValidElement(children)) {
    return null;
  }

  // Clone the child element and add the ref, className, and data-ns-animate attribute
  return cloneElement(children, {
    ref: elementRef,
    className: cn(children?.props?.className, className),
    'data-ns-animate': true,
  });
};

export default RevealAnimation;








.........



'use client';

import { cn } from '@/utils/cn';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface NumberAnimationProps {
  number: number;
  speed?: number;
  interval?: number;
  rooms?: number;
  space?: number | null;
  symbol?: boolean;
  className?: string;
  showPercentage?: boolean;
  heightSpaceRatio?: number;
  fontStyle?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  children?: React.ReactNode;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({
  number,
  speed = 800,
  interval = 150,
  rooms = 2,
  space = null,
  symbol = false,
  className = '',
  showPercentage = false,
  heightSpaceRatio = 2.2,
  fontStyle = {},
  threshold = 0.5,
  rootMargin = '0px 0px -50px 0px',
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const animate = (element: HTMLElement, properties: Record<string, string>, duration: number) => {
    const startTime = performance.now();
    const startValues: Record<string, number> = {};

    // Get initial values
    Object.keys(properties).forEach((prop) => {
      const computedStyle = getComputedStyle(element);
      startValues[prop] = parseFloat(computedStyle.getPropertyValue(prop)) || 0;
    });

    const animateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      Object.keys(properties).forEach((prop) => {
        const startValue = startValues[prop];
        const endValue = parseFloat(properties[prop]);
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        element.style.setProperty(prop, currentValue + (prop === 'top' ? 'px' : ''));
      });

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    };

    requestAnimationFrame(animateFrame);
  };

  const initAnimation = useCallback(() => {
    if (!elementRef.current || isAnimated) {
      return;
    }

    const element = elementRef.current;
    const targetNumber = number;

    // Get the original text content to check for percentage from children or current content
    const originalText = children ? String(children) : element.textContent || '';
    const hasPercentageInOriginal = originalText.includes('%');

    // Use inherit by default to respect parent styles
    const defaultFontStyle: React.CSSProperties = {
      fontSize: 'inherit',
      color: 'inherit',
      ...fontStyle,
    };

    // Calculate single digit width
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.fontSize = defaultFontStyle.fontSize as string;
    element.style.color = 'rgba(0,0,0,0)';
    element.textContent = targetNumber.toString();

    const _height = element.offsetHeight;
    const calculatedSpace = space || _height / heightSpaceRatio;
    element.innerHTML = '';

    // Create number HTML
    let numberHtml = '';
    for (let i = 0; i < 10; i++) {
      const styleProps = Object.keys(defaultFontStyle)
        .map((key) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: inherit`)
        .join('; ');

      numberHtml += `<span style="display: block; width: ${calculatedSpace}px; height: ${_height}px; line-height: ${_height}px; ${styleProps}">${i}</span>`;
    }

    numberHtml = `<div class="_number" style="width: ${calculatedSpace}px; height: ${_height}px; line-height: ${_height}px; display: flex; align-items: center;"><div style="position: relative; width: ${calculatedSpace}px; height: ${_height}px; overflow: hidden;"><div style="position: absolute; width: 100%;">${numberHtml}</div></div></div>`;

    // Process number
    let numArr = String(targetNumber).split('');
    const hasPercentage = showPercentage || hasPercentageInOriginal;
    const _fillZero = !!rooms;

    if (_fillZero) {
      if (String(targetNumber).indexOf('.') !== -1) {
        rooms++;
      }
      for (let i = numArr.length; i < rooms; i++) {
        numArr.unshift('0');
      }
    }

    if (symbol) {
      // Handle thousand separator
      const appendHtml: string[] = [];
      const styleProps = Object.keys(defaultFontStyle)
        .map((key) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: inherit`)
        .join('; ');

      const symbolHtml = `<span style="display: block; width: ${calculatedSpace}px; height: ${_height}px; line-height: ${_height}px; text-align: center; ${styleProps}">,</span>`;
      const dotHtml = `<span style="display: block; width: ${calculatedSpace}px; height: ${_height}px; line-height: ${_height}px; text-align: center; ${styleProps}">.</span>`;

      const symbolDiv = `<div class="_number" style="width: ${calculatedSpace}px; height: ${_height}px; line-height: ${_height}px; display: flex; justify-content: center; align-items: center;"><div style="position: relative; width: ${calculatedSpace}px; height: ${_height}px; overflow: hidden;"><div style="position: absolute; width: 100%;">${symbolHtml}</div></div></div>`;
      const dotDiv = `<div class="_number" style="width: ${calculatedSpace}px; height: ${_height}px; line-height: ${_height}px; display: flex; justify-content: center; align-items: center;"><div style="position: relative; width: ${calculatedSpace}px; height: ${_height}px; overflow: hidden;"><div style="position: absolute; width: 100%;">${dotHtml}</div></div></div>`;

      const numarr = String(targetNumber).split('.');
      const re = /(-?\d+)(\d{3})/;
      while (re.test(numarr[0])) {
        numarr[0] = numarr[0].replace(re, '$1,$2');
      }
      numArr = (numarr.length > 1 ? numarr[0] + '.' + numarr[1] : numarr[0]).split('');

      for (let i = 0; i < numArr.length; i++) {
        if (isNaN(Number(numArr[i]))) {
          if (numArr[i] === '.') {
            appendHtml.push(dotDiv);
          } else {
            appendHtml.push(symbolDiv);
          }
        } else {
          appendHtml.push(numberHtml);
        }
      }
      element.innerHTML = appendHtml.join('');
    } else {
      element.innerHTML = numberHtml.repeat(rooms);

      // Handle decimal point
      if (String(targetNumber).indexOf('.') !== -1) {
        const numberElements = element.querySelectorAll('._number');
        const dotIndex = String(targetNumber).indexOf('.');
        if (numberElements[dotIndex]) {
          const spans = numberElements[dotIndex].querySelectorAll('span');
          if (spans[0]) {
            spans[0].innerHTML = '.';
          }
        }
      }

      // Handle percentage symbol
      if (hasPercentage) {
        const percentageSpan = document.createElement('span');
        percentageSpan.textContent = '%';
        percentageSpan.style.marginLeft = '2px';
        element.appendChild(percentageSpan);
      }
    }

    // Apply font styles
    Object.keys(defaultFontStyle).forEach((key) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      element.style.setProperty(cssKey, defaultFontStyle[key as keyof React.CSSProperties] as string);
    });

    // Animate numbers
    const domArr = element.querySelectorAll('._number');

    for (let i = 0; i < domArr.length; i++) {
      setTimeout(
        (dom, n) => {
          const innerDiv = dom.children[0].children[0] as HTMLElement;
          animate(
            innerDiv,
            {
              top: -_height * Number(n) + 'px',
            },
            speed,
          );
        },
        interval * (domArr.length - i),
        domArr[i],
        numArr[i],
      );
    }

    setIsAnimated(true);
  }, [
    isAnimated,
    number,
    speed,
    interval,
    rooms,
    space,
    symbol,
    showPercentage,
    heightSpaceRatio,
    fontStyle,
    children,
  ]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            initAnimation();
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isAnimated, threshold, rootMargin, initAnimation]);

  return (
    <span ref={elementRef} className={cn('inline-block', className)} style={fontStyle}>
      {children || number}
    </span>
  );
};

NumberAnimation.displayName = 'NumberAnimation';

export default NumberAnimation;











'use client';

import { useEffect, useState } from 'react';

export interface ButtonConfig {
  scrolledClass: string;
  defaultClass: string;
}

export const useNavbarScroll = (threshold: number = 100) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled };
};






'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { mobileMenuData } from '@/data/navbar-data';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import logoDark from '@public/images/shared/logo-dark.svg';
import logoIcon from '@public/images/shared/logo.svg';
import mainLogo from '@public/images/shared/main-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import MobileMenuButton from '../mobile-menu/MobileMenuButton';
import CompanyMenu from './CompanyMenu';
import PartnershipMenu from './PartnershipMenu';
import PeopleAndCultureMenu from './PeopleAndCultureMenu';
import ResourcesMenu from './ResourcesMenu';

const dropdownNavItems = [
  { label: 'Company', dataMenu: 'company-mega-menu', MenuComponent: CompanyMenu },
  { label: 'Collaborate', dataMenu: 'partnership-dropdown-menu', MenuComponent: PartnershipMenu },
  { label: 'Resources', dataMenu: 'resources-mega-menu', MenuComponent: ResourcesMenu },
  { label: 'People & Culture', dataMenu: 'people-dropdown-menu', MenuComponent: PeopleAndCultureMenu },
];

const Navbar = () => {
  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const { isScrolled } = useNavbarScroll(150);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };

  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          isScrolled && 'top-2',
        )}>
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div
            className={cn(
              'border-stroke-2 dark:border-stroke-6 bg-accent dark:bg-background-9 mx-auto flex items-center justify-between rounded-full border px-2.5 py-2.5 xl:py-0',
            )}>
            <div className="flex items-center justify-center">
              <Link href="/" className="inline-flex items-center">
                <span className="sr-only">Home</span>
                <figure className="hidden lg:block lg:max-w-[198px]">
                  <Image src={mainLogo} alt="NextSaaS" className="h-auto w-full dark:invert" priority />
                </figure>
                <figure className="block max-w-[44px] lg:hidden">
                  <Image src={logoIcon} alt="NextSaaS" className="block h-auto w-full dark:hidden" priority />
                  <Image src={logoDark} alt="NextSaaS" className="hidden h-auto w-full dark:block" priority />
                </figure>
              </Link>
            </div>
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center">
                {dropdownNavItems.map(({ label, dataMenu, MenuComponent }) => (
                  <li
                    key={label}
                    className="group/item relative cursor-pointer py-2.5"
                    data-menu={dataMenu}
                    onMouseEnter={() => handleMenuHover(dataMenu)}>
                    <button
                      type="button"
                      className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex cursor-pointer items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                      <span>{label}</span>
                      <span className="block origin-center translate-y-px transition-all duration-300 group-hover/item:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </button>
                    <MenuComponent menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                  </li>
                ))}
                <li className="relative cursor-pointer py-2.5">
                  <Link
                    href="/pricing"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Pricing</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden items-center justify-center xl:flex">
              <Link href="/signup" className="btn btn-md btn-primary hover:btn-white-dark dark:hover:btn-white">
                <span>Get started</span>
              </Link>
            </div>
            <MobileMenuButton />
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={mobileMenuData} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;










......this code from another application only take inspiration this code dont use directly only use this code for reference and analysis this is only for learning purpose only kk implement and reveal animations for all sections and make it smooth as possible ....and i want to show the reveal animations for all sections in down to up and up to down both randomly and smoothly ..... i want to see the smooth animations when i scroll the page ..... 0.4 to 2 seconds transition for all sections smoothly ..... ok ?  navabar is short navabr it means two sides gaps like left and right are empty and middle only navabar should be there and the navabar should be rounded from top and bottom like pill shape and it should be in center of the page ... it should be visible when scroll only ok ? and when i scroll up it should be visible and when i scroll down it should be visible ... ok ? .when implementing eye on the dependcies beacuse dependcies error will raise choose the correct versions 