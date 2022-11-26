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
  let inputElPrevValue = inputEl.value.slice();
  inputEl.placeholder = "Search Twitter";
  const handleAddInputValueTrailingSpace = () => {
    // If the last character is not a space, add one. This is to separate
    // keywords from other input content.
    if (inputEl.value.slice(-1) !== " ") {
      inputEl.value += " ";
      inputElPrevValue = inputEl.value.slice();
      inputDummyEl.innerHTML += " ";
    }
  };
  inputEl.onclick = (e) => {
    e.preventDefault();
    handleAddInputValueTrailingSpace();
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
    console.log("handleHighlightInputText");
    const inputValue = inputEl.value;

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
  const handleDeleteKeyWordIfNeeded = () => {
    if (inputEl.value.length < inputElPrevValue.length) {
      const tempPrevValue = inputElPrevValue.slice();
      inputElPrevValue = inputEl.value.slice();
      // Find the deleted character
      let deletedChar = "";
      let deletedCharIndex = -1;
      for (let i = 0; i < tempPrevValue.length; i++) {
        if (tempPrevValue[i] !== inputEl.value[i]) {
          deletedChar = tempPrevValue[i];
          deletedCharIndex = i;
          break;
        }
      }

      if (deletedChar === " " && deletedCharIndex > -1) {
        // If there is a space before the deleted character, find its index
        let spaceIndex = -1;
        for (let i = deletedCharIndex - 1; i >= 0; i--) {
          if (tempPrevValue[i] === " ") {
            spaceIndex = i;
            break;
          }
        }

        // Delete the string in between the space and the deleted character
        inputEl.value =
          inputEl.value.slice(0, spaceIndex + 1) +
          inputEl.value.slice(deletedCharIndex, inputEl.value.length);
      }
    } else {
      inputElPrevValue = inputEl.value.slice();
    }
  };
  inputEl.addEventListener("input", () => {
    handleDeleteKeyWordIfNeeded();
    handleHighlightInputText(false);
  });
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputEl.value.slice(-1) !== " ") {
      e.preventDefault();
      handleAddInputValueTrailingSpace();
    }
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
      padding: 2px 1px 1px 1px;
      margin: 0 -1px;
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
