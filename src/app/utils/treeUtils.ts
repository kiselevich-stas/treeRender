interface TreeNode {
    value: string | number;
    children: TreeNode[];
}
interface ParentChildMap {
    [key: number]: number[];
}

export function buildTree(parentChildMap: ParentChildMap): TreeNode | null {
    if (Object.keys(parentChildMap).length === 0) {
        return null;
    }

    const nodes: Record<number, TreeNode> = {};
    Object.keys(parentChildMap).forEach(key => {
        const numKey = parseInt(key);
        if (!(numKey in nodes)) {
            nodes[numKey] = { value: numKey, children: [] };
        }
        parentChildMap[numKey].forEach(child => {
            if (!(child in nodes)) {
                nodes[child] = { value: child, children: [] };
            }
            nodes[numKey].children.push(nodes[child]);
        });
    });

    const rootValue = parseInt(Object.keys(parentChildMap)[0]); // или любой другой механизм для определения корня
    return nodes[rootValue];
}

export function parseStructure(data: string): TreeNode | null {
    const tokens: (string | null)[] = data.match(/\d+|\(|\)/g) || [];
    const stack: number[] = [];
    const parentChildMap: ParentChildMap = {};

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token && /^\d+$/.test(token)) {
            const currentNumber = parseInt(token);
            if (stack.length > 0) {
                const parent = stack[stack.length - 1];
                if (parent in parentChildMap) {
                    parentChildMap[parent].push(currentNumber);
                } else {
                    parentChildMap[parent] = [currentNumber];
                }
            }
            if (!(currentNumber in parentChildMap)) {
                parentChildMap[currentNumber] = [];
            }
        } else if (token === '(' && i > 0) {
            const lastNumber = parseInt(tokens[i - 1] as string);
            if (!isNaN(lastNumber)) {
                stack.push(lastNumber);
            }
        } else if (token === ')') {
            stack.pop();
        }
    }
    console.log(parentChildMap)
    return buildTree(parentChildMap);
}
