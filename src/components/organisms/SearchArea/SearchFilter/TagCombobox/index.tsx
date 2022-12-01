import { Combobox } from "@headlessui/react";
import { memo, useCallback, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";
import type { TTag } from "@/types";

import { useSearchMutation, useSearchState } from "../../SearchContext";

const useSelectTags = (tags: TTag[], query = "") => {
  const { selectedTags } = useSearchState();
  const { setSelectedTags } = useSearchMutation();
  const selectedTagNames = selectedTags.map((tag) => tag.name.toLowerCase());
  const notSelectedTags = tags.filter((tag) => !selectedTagNames.includes(tag.name.toLowerCase()));
  const filteredTags =
    query === ""
      ? notSelectedTags
      : notSelectedTags.filter((tag) => {
          return tag.name.toLowerCase().includes(query.toLowerCase());
        });

  const select = useCallback(
    (tags: TTag[]) => {
      setSelectedTags((prev) => Array.from(new Set([...prev, ...tags])));
    },
    [setSelectedTags]
  );

  const unselect = useCallback(
    (tag: TTag) => {
      setSelectedTags((prev) => prev.filter((person) => person.id !== tag.id));
    },
    [setSelectedTags]
  );

  return { filteredTags, select, selectedTags, unselect };
};

type TagComboboxProps = {
  tags: TTag[];
};

export const TagCombobox: React.FC<TagComboboxProps> = memo(({ tags }) => {
  const [query, setQuery] = useState("");
  const { filteredTags, select, selectedTags, unselect } = useSelectTags(tags, query);

  const handleSelect = (tags: TTag[]) => select(tags);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const handleUnselect = (tag: TTag) => unselect(tag);

  return (
    <Combobox as="div" className="flex flex-col" value={selectedTags} onChange={handleSelect} multiple>
      {({ open }) => (
        <>
          <div className="flex flex-col items-start justify-between gap-y-2 md:flex-row md:items-center md:gap-x-4">
            <Combobox.Label className="dropdown-label">タグ</Combobox.Label>
            <div className="dropdown w-full">
              <div className="dropdown-container">
                <Combobox.Input className="dropdown-textfield" onChange={handleChangeQuery} />
                <Combobox.Button className="dropdown-icon-button">
                  {open ? (
                    <FaChevronUp
                      aria-hidden="true"
                      className="text-gray-700 dark:text-gray-100"
                      aria-label="タグドロップダウン開く"
                    />
                  ) : (
                    <FaChevronDown
                      aria-hidden="true"
                      className="text-gray-700 dark:text-gray-100"
                      aria-label="タグドロップダウン閉じる"
                    />
                  )}
                </Combobox.Button>
              </div>
              <DropdownTransition afterLeave={() => setQuery("")}>
                <Combobox.Options className="dropdown-options mt-24 w-full">
                  {filteredTags.length === 0 && query !== "" ? (
                    <div className="dropdown-inactive dropdown-option">該当するタグが見つかりませんでした</div>
                  ) : (
                    filteredTags.map((tag) => (
                      <Combobox.Option
                        className={({ active }) =>
                          `dropdown-option ${active ? "dropdown-active" : "dropdown-inactive"}`
                        }
                        key={tag.id}
                        value={tag}
                      >
                        {tag.name}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </DropdownTransition>
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="mt-2 flex flex-row flex-wrap gap-x-2 gap-y-1 text-gray-700 dark:text-gray-100">
              {selectedTags.map((tag) => (
                <div key={tag.id} className="flex flex-row items-center justify-between gap-1">
                  <button onClick={() => handleUnselect(tag)}>
                    <IoCloseCircle className="h-6 w-6" />
                  </button>
                  <div data-testid="current-tag-name">{tag.name}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Combobox>
  );
});

TagCombobox.displayName = "TagCombobox";
