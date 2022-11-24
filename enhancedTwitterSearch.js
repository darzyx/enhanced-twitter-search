const enhancedTwitterSearch = () => {
  // INITIALIZATIONS
  let css = "";

  // UTILITIES
  const querySelector = document.querySelector.bind(document);
  const createElement = document.createElement.bind(document);
  const createTextNode = document.createTextNode.bind(document);

  // HTML ELEMENTS
  const headEl = document.head;

  const styleEl = createElement("style");

  const searchId = "[role=search]";
  const searchEl = querySelector(searchId);

  const inputId = "[data-testid=SearchBox_Search_Input]";
  const inputEl = querySelector(inputId);
  inputEl.placeholder = "Enhanced Search";
  css += ``;
  inputEl.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    if (inputValue.includes("from:")) {
      console.log({ inputValue, index: inputValue.indexOf("from:") });
      inputEl.value = inputValue.replace("from:", "potato:");
    }
  });

  const listboxId = "[role=listbox]";
  const listboxEl = querySelector(listboxId);
  css += ``;

  const emptyDropdownId = "[data-testid=typeaheadEmptySearch]";
  const emptyDropdownEl = querySelector(emptyDropdownId);
  css += ``;

  const dropdownResultId = "[data-testid=typeaheadResult";
  const dropdownResultEl = querySelector(dropdownResultId);

  const userId = "[data-testid=TypeaheadUser";
  const userEl = querySelector(userId);

  // STYLES
  css += ``;
  headEl.appendChild(styleEl);
  styleEl.appendChild(createTextNode(css)); // https://stackoverflow.com/a/524721

  // CONSOLE GREETING
  return "✨ Hello, enhanced Twitter ✨";
};
enhancedTwitterSearch();
