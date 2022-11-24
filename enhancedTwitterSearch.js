const enhancedTwitterSearch = () => {
  // UTILITIES
  const querySelector = document.querySelector.bind(document);
  const createElement = document.createElement.bind(document);
  const createTextNode = document.createTextNode.bind(document);

  // IDs
  const inputId = "[data-testid=SearchBox_Search_Input]";
  const dropdownId = "[id=typeaheadDropdown-5]";
  const emptyDropdownId = "[data-testid=typeaheadEmptySearch]";
  const dropdownResultId = "[data-testid=typeaheadResult";

  // HTML ELEMENTS
  const headEl = document.head;
  const inputEl = querySelector(inputId);
  const dropdownEl = querySelector(dropdownId);
  const emptyDropdownEl = querySelector(emptyDropdownId);
  const dropdownResultEl = querySelector(dropdownResultId);
  const styleEl = createElement("style");

  // STYLES
  headEl.appendChild(styleEl);
  const css = `
    ${inputId} { 
      padding: 8px;
    }
  `;
  styleEl.appendChild(createTextNode(css)); // https://stackoverflow.com/a/524721

  // CONSOLE GREETING
  return "Hello, enhanced Twitter!";
};
enhancedTwitterSearch();
