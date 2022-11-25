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
  const highlight = (txt, radius) =>
    `<span class="highlight ${radius}">${txt}</span>`;

  // HTML ELEMENTS
  const headEl = document.head;

  const styleEl = createElement("style");

  // Main search parent
  const searchId = "[role=search]";
  const searchEl = querySelector(searchId);
  css += ``;

  // Background component
  const backgroundSearchContainerEl = searchEl.firstChild.firstChild;
  backgroundSearchContainerEl.id = "background-search-container";
  css += ``;

  // Search icon
  // const searchLabelId = "[data-testid=SearchBox_Search_Input_label]";
  // const searchLabelEl = querySelector(searchLabelId);
  // const searchLabelChildren = searchLabelEl.getElementsByTagName("div");
  // searchLabelEl.removeChild(searchLabelChildren[0]);

  // Clear button
  const clearButtonId = "[data-testid=clearButton]";
  const clearButtonEl = querySelector(clearButtonId);
  css += `
    ${clearButtonId} {
      background: transparent;
    }
    ${clearButtonId} svg {
      color: ${highlightColor};
    }
  `;

  // Input field
  const inputId = "[data-testid=SearchBox_Search_Input]";
  const inputEl = querySelector(inputId);
  inputEl.placeholder = "Search Twitter";
  const handleAddEndSpace = (e) => {
    // Check if the last character is a space. If not, add a space
    // This is to separate highlighted words from other input content
    if (e.target.value.slice(-1) !== " ") {
      inputEl.value += " ";
      inputDummyEl.innerHTML += " ";
    }
  };
  inputEl.onclick = (e) => {
    handleAddEndSpace(e);
  };
  css += `
    ${inputId} {
      padding: 12px 12px 12px 11px;
    }
  `;

  // Input parent for styling the dummy input
  const inputParentEl = querySelector(inputId).parentNode;
  inputParentEl.id = "input-parent";
  css += `
    #${inputParentEl.id} { 
      position: relative;
      height: 100%;
    }
  `;

  // Dummy input
  const inputDummyEl = createElement("div");
  inputDummyEl.id = "input-dummy";
  inputDummyEl.innerHTML = `<span>Search Twitter</span>`;
  inputParentEl.insertBefore(inputDummyEl, inputEl);
  css += `
    #input-dummy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 12px;
      background-color: transparent;
      color: rgba(255, 0, 0, 0);
      z-index: -1;
    }
  `;

  const handleHighlightInputText = (didSubmit = false) => {
    const inputValue = inputEl.value;

    console.log({ inputValue });

    if (inputValue.length > 0) {
      inputDummyEl.innerHTML = `<span>${inputValue}</span>`;
    } else {
      inputDummyEl.innerHTML = `<span>Search Twitter</span>`;
    }

    const keyWords = ["from:", "to:", "min_faves:", "min_retweets:"];

    let result = "";
    for (let i = 0; i < inputValue.length; i++) {
      let foundKeyWord = false;
      for (let j = 0; j < keyWords.length; j++) {
        const keyWord = keyWords[j];
        if (keyWord === inputValue.substring(i, i + keyWord.length)) {
          let highlightStr = keyWord;
          let radius = "square-right";
          for (let k = i + keyWord.length; k < inputValue.length; k++) {
            if (
              inputValue[k] === " " ||
              (inputValue[k] !== " " &&
                didSubmit &&
                k === inputValue.length - 1)
            ) {
              const end =
                inputValue[k] !== " " &&
                didSubmit &&
                k === inputValue.length - 1
                  ? k + 1
                  : k;
              highlightStr += inputValue.substring(i + keyWord.length, end);
              radius = "round-right";
              break;
            }
          }
          result += highlight(highlightStr, radius);
          i += highlightStr.length - 1;
          foundKeyWord = true;
          break;
        }
      }
      if (!foundKeyWord) {
        result += inputValue[i];
      }
    }
    inputDummyEl.innerHTML = result;
  };
  // Execute immediately for any existing text:
  handleHighlightInputText(true);
  inputEl.addEventListener("input", () => {
    handleHighlightInputText(false);
  });
  searchEl.addEventListener("submit", () => {
    handleHighlightInputText(true);
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
      height: 100%;
      padding: 3px 2px 2px 2px;
      margin: 0 0 0 -3px;
      background-color: rgba(29, 155, 240, 0.75);
    }
    .square-right {
      border-radius: 4px 0 0 4px;
    }
    .round-right {
      border-radius: 4px 4px 4px 4px;
    }
  `;
  headEl.appendChild(styleEl);
  styleEl.appendChild(createTextNode(css)); // https://stackoverflow.com/a/524721

  // CONSOLE GREETING
  return "✨ Hello, enhanced Twitter ✨";
};
enhancedTwitterSearch();
