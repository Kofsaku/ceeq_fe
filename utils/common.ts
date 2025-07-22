import { ISequenceStep } from "@/store/use-sequence-store";

export function insertElement(arr: any[], element: any, position: number) {
  // Kiểm tra tham số
  if (
    !Array.isArray(arr) ||
    position < 0 ||
    position > arr.length ||
    typeof position !== "number"
  ) {
    return [];
  }

  // Tạo bản sao mảng để không thay đổi mảng gốc
  let newArray = [...arr];
  newArray.splice(position, 0, element);
  return newArray;
}

export const updateTree = (
  nodes: ISequenceStep[],
  parentId: string,
  newChild: ISequenceStep | ISequenceStep[]
) => {
  return nodes.map((node) => {
    if (node.id === parentId) {
      if (node.children) {
        return {
          ...node,
          children: Array.isArray(newChild)
            ? [...(newChild || [])]
            : [newChild],
        };
      }
      return {
        ...node,
        children: Array.isArray(newChild)
          ? [...(node.children || []), ...newChild]
          : [...(node.children || []), newChild],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTree(node.children, parentId, newChild),
      };
    }
    return node;
  });
};

export const insertChildrenBetween = (
  nodes: ISequenceStep[],
  parentId: string,
  newChild: ISequenceStep[]
) => {
  if (nodes.length === 0) {
    return newChild.map((child) => ({
      ...child,
      isRoot: true,
    }));
  }
  return nodes.map((node) => {
    if (node.id === parentId) {
      const existingChildren = node.children || [];
      const newChildren = Array.isArray(newChild) ? newChild : [newChild];

      // If newChild has more than 1 value, old children become children of first new child
      if (newChildren.length > 1) {
        const updatedNewChildren = newChildren.map((child, index) => {
          if (index === 0) {
            return {
              ...child,
              parentId: node.id, // Set parent ID
              children: [...(child.children || []), ...existingChildren].map(
                (existingChild) => ({
                  ...existingChild,
                  parentId: child.id, // Set parent ID for existing children
                })
              ),
            };
          }
          return {
            ...child,
            parentId: node.id, // Set parent ID
          };
        });

        return {
          ...node,
          children: updatedNewChildren,
        };
      }

      // If newChild has 1 value, new child becomes parent of old children
      if (newChildren.length === 1) {
        const updatedNewChild = {
          ...newChildren[0],
          parentId: node.id, // Set parent ID
          children: [
            ...(newChildren[0].children || []),
            ...existingChildren,
          ].map((existingChild) => ({
            ...existingChild,
            parentId: newChildren[0].id, // Set parent ID for existing children
          })),
        };

        return {
          ...node,
          children: [updatedNewChild],
        };
      }

      // If no new children, return unchanged
      return node;
    }
    if (node.children) {
      return {
        ...node,
        children: insertChildrenBetween(node.children, parentId, newChild),
      };
    }
    return node;
  });
};

export function generateMeetId(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const getRandomLetter = () =>
    letters[Math.floor(Math.random() * letters.length)];

  const part1 = Array(3)
    .fill(0)
    .map(() => getRandomLetter())
    .join("");
  const part2 = Array(4)
    .fill(0)
    .map(() => getRandomLetter())
    .join("");
  const part3 = Array(3)
    .fill(0)
    .map(() => getRandomLetter())
    .join("");

  return `${part1}-${part2}-${part3}`;
}
