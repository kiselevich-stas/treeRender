import './input.css';

export interface InputProps {
    placeholder?: string;
    classList?: string[];
    onChange?: (value: string) => void;
}

export class Input {
    private placeholder?: string;
    private classList?: string[];
    private onChange?: (value: string) => void;

    constructor(props: InputProps) {
        this.placeholder = props.placeholder;
        this.classList = props.classList;
        this.onChange = props.onChange;
    }

    render(): HTMLInputElement {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        if (this.placeholder) {
            inputElement.placeholder = this.placeholder;
        }
        if (this.classList) {
            this.classList.forEach(el => inputElement.classList.add(el));
        }
        if (this.onChange) {
            inputElement.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                if (this.onChange)
                    this.onChange(target.value);
            });
        }
        return inputElement;
    }
}
