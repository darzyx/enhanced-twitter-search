const enhancedTwitterSearch = () => {
  // INITIALIZATIONS
  let css = "";
  const mutedColor = "#8B98A5";
  const mutedBgColor = "rgb(39, 51, 64)";
  const highlightColor = "#1D9Bf0";
  const darkColor = "rgb(21, 32, 43)";

  // UTILITIES
  const querySelector = document.querySelector.bind(document);
  const createElement = document.createElement.bind(document);
  const createTextNode = document.createTextNode.bind(document);
  const highlight = (txt) => `<span class="highlight">${txt}</span>`;

  // HTML ELEMENTS
  const headEl = document.head;

  const styleEl = createElement("style");

  // Main search parent
  const searchId = "[role=search]";
  const searchEl = querySelector(searchId);
  css += `
  ${searchId} div {
    border-radius: 4px;
    border: none;
  }`;

  // Background component
  const backgroundSearchContainerEl = searchEl.firstChild.firstChild;
  backgroundSearchContainerEl.id = "background-search-container";
  css += `
  #background-search-container {
    background-color: #111;
  }`;

  // Search icon
  const searchLabelId = "[data-testid=SearchBox_Search_Input_label]";
  const searchLabelEl = querySelector(searchLabelId);
  const searchLabelChildren = searchLabelEl.getElementsByTagName("div");
  searchLabelEl.removeChild(searchLabelChildren[0]);

  // Clear button
  const clearButtonId = "[data-testid=clearButton]";
  const clearButtonEl = querySelector(clearButtonId);
  css += `
    ${clearButtonId} {
      margin-right: 4px;
      background: transparent;
    }
    ${clearButtonId} svg {
      color: ${highlightColor};
    }
  `;

  // Input field
  const inputId = "[data-testid=SearchBox_Search_Input]";
  const inputEl = querySelector(inputId);
  inputEl.placeholder = " Enhanced Twitter Search";
  css += `
  ${inputId} {
    padding: 8px 6px;
  }`;

  // Input parent for styling the dummy input
  const inputParentEl = querySelector(inputId).parentNode;
  inputParentEl.id = "input-parent";
  css += `#${inputParentEl.id} { 
    position: relative; 
  }`;

  // Dummy input
  const inputDummyEl = createElement("div");
  inputDummyEl.id = "input-dummy";
  css += `
    #input-dummy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 8px 4px;
      background-color: transparent;
      color: rgba(255, 0, 0, 0);
      z-index: -1;
      margin: 0;
    }
  `;
  inputDummyEl.innerHTML = `<span>Search Twitter</span>`;
  inputParentEl.insertBefore(inputDummyEl, inputEl);
  css += ``;

  inputEl.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 0) {
      inputDummyEl.innerHTML = `<span>${inputValue}</span>`;
    } else {
      inputDummyEl.innerHTML = `<span>Search Twitter</span>`;
    }

    const keyWords = ["from:", "to:", "min_faves:", "min_retweets:"];

    let result = "";
    for (let i = 0; i < inputValue.length; i++) {
      if ("from:" === inputValue.substring(i, i + 5)) {
        result += highlight("from:");
        i += 4;
      } else if ("to:" === inputValue.substring(i, i + 3)) {
        result += highlight("to:");
        i += 2;
      } else if ("min_faves:" === inputValue.substring(i, i + 10)) {
        result += highlight("min_faves:");
        i += 9;
      } else if ("min_retweets:" === inputValue.substring(i, i + 13)) {
        result += highlight("min_retweets:");
        i += 12;
      } else {
        result += inputValue[i];
      }
    }
    console.log({ result, inputValue });
    inputDummyEl.innerHTML = result;
  });

  const listboxId = "[role=listbox]";
  const listboxEl = querySelector(listboxId);

  const emptyDropdownId = "[data-testid=typeaheadEmptySearch]";
  const emptyDropdownEl = querySelector(emptyDropdownId);
  css += ``;

  const dropdownResultId = "[data-testid=typeaheadResult";
  const dropdownResultEl = querySelector(dropdownResultId);

  const userId = "[data-testid=TypeaheadUser";
  const userEl = querySelector(userId);

  // STYLES
  css += `
    .highlight {
      padding: 4px 0px 4px 2px;
      background-color: ${mutedBgColor};
      border-radius: 2px 0 0 2px;
    }
  `;
  headEl.appendChild(styleEl);
  styleEl.appendChild(createTextNode(css)); // https://stackoverflow.com/a/524721

  // CONSOLE GREETING
  return "✨ Hello, enhanced Twitter ✨";
};
enhancedTwitterSearch();
