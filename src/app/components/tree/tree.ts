interface TreeNode {
    value: number | string;
    children: TreeNode[];
}

export class TreeView {
    private containerId: string;

    constructor(containerId: string) {
        this.containerId = containerId;
    }

    renderTree(node: TreeNode | null) {
        if (!node) return;

        const treeElement = this.createTreeElement(node);
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
            container.appendChild(treeElement);
        } else {
            console.error('Ошибка: контейнер для отображения дерева не найден.');
        }
    }

    private createTreeElement(node: TreeNode, depth = 0): HTMLUListElement {
        const ul = document.createElement('ul');
        ul.classList.add(`depth-${depth}`);

        const li = document.createElement('li');
        const span = document.createElement('span')
        span.textContent = node.value.toString();
        li.appendChild(span)
        ul.appendChild(li);

        node.children.forEach(child => {
            const childUl = this.createTreeElement(child, depth + 1);
            li.appendChild(childUl);
        });

        return ul;
    }
}
