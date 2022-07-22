const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  nodeTree = null;

  root() {
    return this.nodeTree;
  }

  addChildren(node) {
    if (node.left !== null) {
      this.add(node.left.data);
      this.addChildren(node.left);
    }
    if (node.right !== null) {
      this.add(node.right.data);
      this.addChildren(node.right);
    }
  }

  add(data) {
    if (this.nodeTree === null) {
     return this.nodeTree = new Node(data);
    }

    function addNode(currentNode, value) {

      if (currentNode.data > value) {
        if (currentNode.left === null) {
          return currentNode.left = new Node(value);
        }
        addNode(currentNode.left, value);
      }
      if (currentNode.data < value) {
        if (currentNode.right === null) {
          return currentNode.right = new Node(value);
        }
        addNode(currentNode.right, value);
      }
    }
    addNode(this.nodeTree, data);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    if (this.nodeTree === null) {
      return null;
    }
    function findData(currentNode, value) {
      if (currentNode.data == value) {
        return currentNode;
      }
      if (currentNode.data > value) {
        if (currentNode.left !== null) {
          return findData(currentNode.left, value);
        }
        return null;
      }
      if (currentNode.data < value) {
        if (currentNode.right != null) {
          return findData(currentNode.right, value);
        }
        return null;
      }
      return null;
    }
    return findData(this.nodeTree, data);
  }

  remove(data) {
    function findParentNode(currentNode, value) {
      const parent = currentNode;
      const left = currentNode.left;
      const right = currentNode.right;

      if (((left != null) && (left.data == value)) || ((right != null) && (right.data == value))) {
        return parent;
      }
      if (parent.data > value) {
        if (left !== null) {
          return findParentNode(left, value);
        }
      }
      if (parent.data < value) {
        if (right != null) {
          return findParentNode(right, value);
        }
      }
      return null;
    }

    if (this.nodeTree.data === data) {
      const oldRoot = this.nodeTree;
      this.nodeTree = null;
      return this.addChildren(oldRoot);
    }

    const parent = findParentNode(this.nodeTree, data);
    if (parent === null) {
      return null;
    }
    let removedNode;
    if ((parent.left != null) && (parent.left.data === data)) {
      removedNode = parent.left;
      parent.left = null;
    }
    if ((parent.right != null) && (parent.right.data === data)) {
      removedNode = parent.right;
      parent.right = null;
    }
    this.addChildren(removedNode);
  }

  min() {
    if (this.nodeTree === null) {
      return null;
    }
    function min(node) {
      if (node.left !== null) {
        return min(node.left);
      }
      return node.data;
    }
    return min(this.nodeTree);
  }

  max() {
    if (this.nodeTree === null) {
      return null;
    }
    function max(node) {
      if (node.right !== null) {
        return max(node.right);
      }
      return node.data;
    }
    return max(this.nodeTree);
  }
}

module.exports = {
  BinarySearchTree
};