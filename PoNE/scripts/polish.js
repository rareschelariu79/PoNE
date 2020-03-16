class BTree {
  constructor() {
    this.data = null;
    this.left = null;
    this.right = null;
  }
}

function findFirstOperator(input) {
  console.log("@" + input + "@");
  let precedence = "+-*/";
  let result;
  for (let i = 0; i < precedence.length; i++) {
    result = input.indexOf(precedence.charAt(i));
    if (-1 !== result) return result;
  }
  return -1;
}
function makeExprTree(input, tree) {
  let positionOperator = findFirstOperator(input);
  if (null === tree) tree = new BTree();
  tree.left = null;
  tree.right = null;
  if (-1 === positionOperator) {
    tree.data = parseInt(input);
    return;
  }
  tree.data = input.charAt(positionOperator);
  let substrLeft = input.substring(0, positionOperator);
  let substrRight = input.substring(positionOperator + 1, input.length);

  if (0 !== substrLeft.length) {
    tree.left = new BTree();
    makeExprTree(substrLeft, tree.left);
  }
  if (0 !== substrRight.length) {
    tree.right = new BTree();
    makeExprTree(substrRight, tree.right);
  }
}
function polishPre(tree) {
  if (tree.data === null) return "Empty expression";
  if (tree.left === null && tree.right === null) return "" + tree.data;
  if (tree.left === null) return "" + tree.data + polishPre(tree.right);
  if (tree.right === null) return "" + tree.data + polishPre(tree.left);
  return "" + tree.data + polishPre(tree.left) + polishPre(tree.right);
}
function polishPost(tree) {
  if (tree.data === null) return "Empty expression";
  if (tree.left === null && tree.right === null) return "" + tree.data;
  if (tree.left === null) return "" + tree.data + polishPost(tree.right);
  if (tree.right === null) return "" + tree.data + polishPost(tree.left);
  return "" + polishPost(tree.left) + polishPost(tree.right) + tree.data;
}
function getExprPre() {
  let input = document.getElementById("inputExpr").value;
  var myTree = new BTree();
  makeExprTree(input, myTree);
  document.getElementById("outputExpr").innerHTML = polishPre(myTree);
}
function getExprPost() {
  let input = document.getElementById("inputExpr").value;
  var myTree = new BTree();
  makeExprTree(input, myTree);
  document.getElementById("outputExpr").innerHTML = polishPost(myTree);
}
document.getElementById("btnExprPre").onclick = function() {
  getExprPre();
};
document.getElementById("btnExprPost").onclick = function() {
  getExprPost();
};
