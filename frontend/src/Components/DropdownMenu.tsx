import { useState } from 'react';
type props = {
  name: string,
  content: string[],
  searchVarFunc: (returnVar: any) => void;
}

const DropdownMenu = ({ name, content, searchVarFunc }: props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="font-mono inline-flex justify-center w-full px-4 py-2 text-4xl font-medium text-gray-100 rounded-md hover:bg-bice-blue focus:outline-none focus-visible:ring-2 focus-visible:text-gray-100 focus-visible:ring-opacity-75"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {name}
          <svg
            className="-mr-1 ml-2 h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-bice-blue ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">

            {content.map((c, index) => (
              <a
                key={index}
                onClick={() => searchVarFunc(c)}
                className="block px-4 py-2 text-sm text-gray-100 hover:bg-picton-blue hover:text-gray-100 cursor-pointer"
                role="menuitem"
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;