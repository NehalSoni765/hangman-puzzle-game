export const callBackPuzzle = (callBack) => {
  callBack("Hello callback puzzle");
};

export const getPuzzle = (wordCount, callBack) => {
  const request = new XMLHttpRequest();
  request.addEventListener("readystatechange", (e) => {
    if (e.target.status == 200) {
      if (request.target && request.target.response) {
        const data = JSON.parse(e.target.response);
        callBack(undefined, data);
      }
    } else {
      callBack("an error has taken place", undefined);
    }
  });
  request.open("GET", `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
};

export const getPuzzleSync = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "https://puzzle.mead.io/puzzle?wordCount=3", false); //default async true
  request.send();
  if (request.status == 200 && request.readyState === 4) {
    const data = JSON.parse(request.response);
    return data.puzzle;
  } else {
    throw new Error("Things did not go well.");
  }
};

export const getPuzzlePromises = (wordCount) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.response);
        resolve(data.puzzle);
      } else if (e.target.readyState === 4) {
        reject("an error has taken place");
      }
    });
    request.open("GET", `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
    request.send();
  });

export const getPuzzleBYFetchAPI = (wordCount) =>
  fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then(
    (response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error("Unable to fetch the puzzle");
      }
    }
  );

export const getPuzzleAsyncAwait = async (wordCount) => {
  const response = await fetch(
    `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );
  if (response.status == 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error("Unable to fetch the puzzle");
  }
};

export const getCountries = (countryCode) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", (e) => {
      if (e.target.status == 200 && e.target.readyState == 4) {
        const data = JSON.parse(e.target.response);
        const respose = data.find((country) => country.cca2 === countryCode);
        resolve(respose);
      } else if (e.target.readyState === 4) {
        reject("Unable to fetch country");
      }
    });
    request.open("GET", "https://restcountries.com/v3.1/all");
    request.send();
  });

export const getLocation = () =>
  fetch("https://ipinfo.io/json?token=1a11bd55cc8f9c", {}).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("unable to fetch location API");
    }
  });
