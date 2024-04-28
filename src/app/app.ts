import { Input, InputProps } from '../app/components/input/input';
import { Button, ButtonProps } from '../app/components/button/button';
import { TreeView } from '../app/components/tree/tree';
import { parseStructure } from '../app/utils/treeUtils';


export class App {
  private treeView: TreeView;

  constructor() {
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    const inputProps: InputProps = {
      placeholder: 'Введите определение дерева',
      classList: ['treeInput', 'input']
    };
    const inputField = new Input(inputProps).render();

    const buttonProps: ButtonProps = {
      text: 'Отрисовать',
      onClick: this.renderTree.bind(this),
      classList: ['button'],
    };
    const renderButton = new Button(buttonProps);
    const buttonElement = renderButton.render();

    wrapper.appendChild(inputField);
    wrapper.appendChild(buttonElement);

    const treeVisualization = document.createElement('div');
    treeVisualization.id = 'treeVisualization';
    wrapper.appendChild(treeVisualization);
    this.treeView = new TreeView('treeVisualization');
    document.body.appendChild(wrapper)
  }


  private renderTree() {
    const inputField = document.querySelector('.treeInput') as HTMLInputElement;
    let inputText = inputField.value.trim();

    // Проверка на пустой ввод
    if (!inputText) {
      alert('Введите определение дерева');
      return;
    }

    inputText = inputText.replace(/\s+/g, ' '); // Удаление лишних пробелов

    try {
      const treeData = parseStructure(inputText);

      if (treeData) {
        console.log(treeData);
        this.treeView.renderTree(treeData);
      } else {
        throw new Error('Ошибка при парсинге определения дерева.');
      }
    } catch (error: any) {
      console.error('Произошла ошибка:', error.message);
      alert('Произошла ошибка при обработке данных. Проверьте ввод и попробуйте снова.');
    }
  }


}

new App();
