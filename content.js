(() => {
  "use strict";

  const debug = false;
  const firstWordleDate = new Date(Date.UTC(2021, 5, 19));
  const navigationId = "wordle-archive-navigation";

  function log(...args) {
    if (debug) console.log("**** Wordle Archive Navigation:", ...args);
  }

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function formatDateLabel(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  }

  function getToday() {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  }

  function getCurrentPuzzleDate() {
    const currentPuzzlePaths = [
      "/games/wordle",
      "/games/wordle/",
      "/games/wordle/index.html"
    ];

    if (currentPuzzlePaths.includes(location.pathname)) {
      log("Using today's date for current Wordle page");
      return getToday();
    }

    const match = location.pathname.match(/^\/games\/wordle\/(\d{4})-(\d{2})-(\d{2})\/?$/);
    if (!match) return null;

    const dateString = `${match[1]}-${match[2]}-${match[3]}`;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));

    if (formatDate(date) !== dateString) {
      log("Invalid puzzle date in URL:", dateString);
      return null;
    }

    return date;
  }

  function shiftDate(date, days) {
    const shiftedDate = new Date(date);
    shiftedDate.setUTCDate(shiftedDate.getUTCDate() + days);
    return shiftedDate;
  }

  function createDateLink(direction) {
    const link = document.createElement("a");
    link.dataset.direction = direction;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", direction === "previous"
      ? "M15 18l-6-6 6-6"
      : "M9 18l6-6-6-6");

    svg.appendChild(path);
    link.appendChild(svg);

    link.addEventListener("click", event => {
      if (link.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        log(`${direction} button is disabled`);
        return;
      }

      log(`Opening ${direction} puzzle:`, link.href);
    });

    return link;
  }

  function setDateLink(link, date, enabled) {
    const direction = link.dataset.direction;
    const dateLabel = formatDateLabel(date);

    if (enabled) {
      link.href = `/games/wordle/${formatDate(date)}`;
      link.title = `${direction === "previous" ? "Previous" : "Next"} Wordle: ${dateLabel}`;
      link.setAttribute("aria-label", link.title);
      link.removeAttribute("aria-disabled");
      log(`${direction} puzzle:`, link.href);
      return;
    }

    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.title = direction === "previous"
      ? "This is the first Wordle"
      : "Today's Wordle is the newest puzzle";
    link.setAttribute("aria-label", link.title);
    log(`${direction} button disabled at archive boundary`);
  }

  function createNavigation(puzzleDate) {
    document.getElementById(navigationId)?.remove();

    const navigation = document.createElement("nav");
    navigation.id = navigationId;
    navigation.setAttribute("aria-label", "Wordle archive dates");

    const previousDate = shiftDate(puzzleDate, -1);
    const nextDate = shiftDate(puzzleDate, 1);
    const previousLink = createDateLink("previous");
    const nextLink = createDateLink("next");

    setDateLink(previousLink, previousDate, puzzleDate > firstWordleDate);
    setDateLink(nextLink, nextDate, puzzleDate < getToday());

    navigation.append(previousLink, nextLink);
    document.body.appendChild(navigation);

    return navigation;
  }

  function positionNavigation(navigation, board) {
    const boardRect = board.getBoundingClientRect();
    const previousLink = navigation.querySelector('[data-direction="previous"]');
    const nextLink = navigation.querySelector('[data-direction="next"]');
    const buttonSize = previousLink.getBoundingClientRect().width;
    const gap = 16;
    const pagePadding = 8;
    const top = boardRect.top + ((boardRect.height - buttonSize) / 2);
    let previousLeft = boardRect.left - buttonSize - gap;
    let nextLeft = boardRect.right + gap;

    if (previousLeft < pagePadding || nextLeft + buttonSize > window.innerWidth - pagePadding) {
      previousLeft = pagePadding;
      nextLeft = window.innerWidth - buttonSize - pagePadding;
      log("Using narrow screen arrow positions");
    }

    previousLink.style.left = `${previousLeft}px`;
    previousLink.style.top = `${top}px`;
    nextLink.style.left = `${nextLeft}px`;
    nextLink.style.top = `${top}px`;

    log("Positioned arrows around board");
  }

  function findBoard() {
    return document.querySelector('#wordle-app-game [role="group"][aria-label="Row 1"]')?.parentElement;
  }

  function initialize() {
    log("Extension initialized:", location.href);

    const puzzleDate = getCurrentPuzzleDate();
    if (!puzzleDate) {
      log("Current page is not a Wordle puzzle");
      return;
    }

    log("Current puzzle date:", formatDate(puzzleDate));

    function addNavigation(board) {
      log("Found Wordle board");

      const navigation = createNavigation(puzzleDate);
      const updatePosition = () => positionNavigation(navigation, board);

      requestAnimationFrame(updatePosition);
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, { passive: true });

      const resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(board);
    }

    const board = findBoard();
    if (board) {
      addNavigation(board);
      return;
    }

    log("Waiting for Wordle board");

    const observer = new MutationObserver(() => {
      const loadedBoard = findBoard();
      if (!loadedBoard) return;

      observer.disconnect();
      addNavigation(loadedBoard);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  initialize();
})();
