import { Ref, RefObject, useRef, useState } from "react";
import styles from "./Select.module.css";
import { classnames, useOnClickOutside } from "@utils";
import ChevronIcon from "@assets/icons/chevron-bottom.svg?react";
import CloseIcon from "@assets/icons/X.svg?react";
import { Checkbox } from "../Checkbox/Checkbox";
import { SelectOption } from "@models";

interface SelectProps {
  options: SelectOption[];
  multiple?: boolean;
  onChange?: (value: SelectOption | SelectOption[] | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  selectedOption?: SelectOption;
}

export const Select = ({
  options,
  multiple = false,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  selectedOption,
  ref,
}: SelectProps & { ref?: Ref<HTMLInputElement> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(
    selectedOption ? [selectedOption] : [],
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(selectRef as RefObject<HTMLDivElement>, () =>
    setIsOpen(false),
  );

  const toggleOption = (option: SelectOption) => {
    if (disabled) return;

    let newSelectedOptions: SelectOption[];

    if (multiple) {
      const isSelected = selectedOptions.some(
        (item) => item.value === option.value,
      );
      newSelectedOptions = isSelected
        ? selectedOptions.filter((item) => item.value !== option.value)
        : [...selectedOptions, option];
    } else {
      newSelectedOptions = selectedOptions.some(
        (item) => item.value === option.value,
      )
        ? []
        : [option];
      setIsOpen(false);
    }

    setSelectedOptions(newSelectedOptions);

    if (onChange) {
      if (multiple) {
        onChange(newSelectedOptions.length > 0 ? newSelectedOptions : null);
      } else {
        onChange(newSelectedOptions.length > 0 ? newSelectedOptions[0] : null);
      }
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div ref={selectRef} className={classnames(styles.container, className)}>
      <div
        ref={ref}
        className={classnames(styles.select)}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className={styles.selected_options}>
          {selectedOptions.length === 0 ? (
            <span className={classnames(styles.placeholder, "text_18_m")}>
              {placeholder}
            </span>
          ) : multiple ? (
            selectedOptions.map((option, index) => (
              <span key={option.value} className="text_18_m">
                {(index ? ", " : "") + option.label}
              </span>
            ))
          ) : (
            <span>{selectedOptions[0].label}</span>
          )}
        </div>
        <div className={styles.icons}>
          {selectedOptions.length > 0 && !disabled && (
            <button type="button" onClick={clearSelection}>
              <CloseIcon className={classnames(styles.close_icon)} />
            </button>
          )}

          {isOpen ? (
            <ChevronIcon
              className={classnames(
                styles.chevron_icon,
                styles.chevron_icon_up,
              )}
            />
          ) : (
            <ChevronIcon className={styles.chevron_icon} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={styles.options_container}>
          <ul className={styles.options}>
            {options.map((option) => {
              const isSelected = selectedOptions.some(
                (item) => item.value === option.value,
              );
              return (
                <li
                  key={option.value}
                  className={styles.option}
                  onClick={() => toggleOption(option)}
                >
                  {multiple && <Checkbox checked={isSelected} />}
                  <p>{option.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
