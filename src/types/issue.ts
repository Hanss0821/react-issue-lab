// 1. 定义三种合法状态
export type IssueStatus = "todo" | "in_progress" | "done";

// 2. 定义 Issue 数据模型
export interface Issue {
  readonly id: string;
  title: string;
  status: IssueStatus;
  readonly createdAt: Date;
}

// 3. 创建 Issue 时限制status为todo
// Omit<Issue, "id" | "createdAt">;
export type CreateIssueInput = Pick<Issue, "title">;

export function createIssue(input: CreateIssueInput): Issue {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    status: "todo",
    createdAt: new Date(),
  };
}

/**
 * 1.使用字符串字面量联合类型，是为了约束合法业务状态、
 * 阻止非法值赋入，并支持控制流收窄及穷尽性检查。
 *
 * 2.readonly 用来表达属性不可重新赋值的设计意图，
 * 并在 TypeScript 静态检查阶段阻止误操作，
 * 但不提供运行时不可变性保证。
 *
 * 3.Single Source of Truth
 * 当两个类型之间存在稳定、明确的结构关系时，使用工具类型表达这种关系
 *
 * 两个工具使用 （待Todo：练习两个工具的自定义实现）
 * 1.Pick 从结构类型中取出目标字段类型
 * 2.Omit 从结构类型中剔除目标字段类型
 */

/**
 * 要求：找到指定 ID 的 Issue，将它的 status 修改为传入的状态，
 * 其余 Issue 对象保持原引用，且不能直接修改原数组。
 */

// keyof的作用在于将所有的键构成新的联合类型
export type MyPick<T, K extends keyof T> = {
  // K是联合类型 in 关键字把联合类型遍历映射出来
  [P in K]: T[P];
};

// K不做约束，不属于直接忽略掉
export type MyOmit<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
