# 03: 前端面试技能拼图 1： 数据结构和算法（下），大厂面试必考

## 01: 求二叉搜索树的第 K 小的值

### 题目

一个二叉搜索树，求其中的第 K 小的节点的值。
如下图，第 3 小的节点是 `4`

![](./img/02/二叉搜索树.png)

### 二叉树

树，大家应该都知道，如前端常见的 DOM 树、vdom 结构。

二叉树，顾名思义，就是每个节点最多能有两个子节点。

树节点的数据结构是 `{ value, left, right }`

```ts
interface ITreeNode {
  value: number // 或其他类型
  left?: ITreeNode | null
  right?: ITreeNode | null
}
```

### 二叉树的遍历

- 前序遍历：`root -> left -> right`
- 中序遍历：`left -> root -> right`
- 后序遍历：`left -> right -> root`

### 二叉树遍历的三种方式代码演示

```typescript
// 数据结构演示
const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
}
```

#### 前序遍历

```typescript
export interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}

/**
 * 二叉树前序遍历
 * @param node tree node
 */
function preOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  console.log(node.value)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}

// 前序遍历结果
preOrderTraverse(bst) // 5 3 2 4 7 6 8
```

#### 中序遍历

```typescript
/**
 * 二叉树中序遍历
 * @param node tree node
 */
function inOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  inOrderTraverse(node.left)
  console.log(node.value)
  inOrderTraverse(node.right)
}

// 中序遍历结果
inOrderTraverse(bst) // 2 3 4 5 6 7 8
```

#### 后序遍历

```typescript
/**
 * 二叉树后序遍历
 * @param node tree node
 */
function postOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  postOrderTraverse(node.left)
  postOrderTraverse(node.right)
  console.log(node.value)
}

// 后序遍历结果
postOrderTraverse(bst) // 2 4 3 6 8 7 5
```

### 二叉搜索树 BST

- left(包括其后代) value <= 根节点(root value)
- right(包括其后代) value >= 根节点(root value)

### 分析题目

根据 `BST` 的特点，中序遍历的结果，正好是按照从小到大排序的结果。

所以，中序遍历，求数组的 `arr[k]` 即可。

### 答案

```typescript
interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}

const arr: number[] = []

function inOrderTraverse(node: ITreeNode | null) {
  if (node == null) return
  inOrderTraverse(node.left)
  arr.push(node.value)
  inOrderTraverse(node.right)
}

/**
 * 寻找 BST 里的第 K 小值
 * @param node tree node
 * @param k 第几个值
 */
function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node)
  return arr[k - 1] || null
}

console.log(getKthValue(bst, 3)) // 4
```

### 划重点

* 二叉搜索树的特点
* 前序、中序、后序遍历
* 二叉树的特点：`left <= root`, `right >= root`
* 二叉搜索树的价值：可使用 **二分法** 进行快速查找

