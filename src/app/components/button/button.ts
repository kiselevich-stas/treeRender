import './button.css';

export interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  classList: string[];
}

export class Button {
  text: string;

  onClick: () => void;

  disabled?: boolean;

  classList: string[];

  constructor(props: ButtonProps) {
    this.text = props.text;
    this.onClick = props.onClick;
    this.disabled = props.disabled;
    this.classList = props.classList;
  }

  render(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = this.text;
    this.classList.forEach((className) => {
      button.classList.add(`${className}`);
    });
    button.addEventListener('click', this.onClick);
    if (this.disabled) {
      button.disabled = true;
    }
    return button;
  }
}
