
import {createSignal} from "solid-js";

interface InputFieldWithButtonProps {
    label: string;
    value: string;
    onConfirm: (value: string) => void;
}

const InputFieldWithButton = (
    {
        onConfirm,
        value,
        label
    }: InputFieldWithButtonProps
) => {
    const [inputValue, setInputValue] = createSignal<string>(value);
    const input =
        <input type="text"
               value={inputValue()}
               onChange={(event) => setInputValue(event.target.value)}
               onKeyDown={(event) => handleKeyPress(event)}
        />


    const handleConfirmClick = (): void => {
        onConfirm(inputValue());
    };

    const handleKeyPress = (event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
            handleConfirmClick();
        }
    };

    return (
        <div>
            {label}
            {input}
            <button onClick={handleConfirmClick}>Confirm</button>
        </div>
    );
};
export default InputFieldWithButton