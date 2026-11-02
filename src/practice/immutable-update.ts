//   {
//   issues: state.issues.map((issue) => {
//     if (issue.id === issueId && issue.subtasks && issue.subtasks.length) {
//       return {
//         ...issue,
//         subtasks: issue.subtasks.map((subtask) => {
//           if (subtask.id === subtaskId) {
//             return {
//               ...subtask,
//               completed,
//             };
//           }
//           return subtask;
//         }),
//       };
//     }
//     return issue;
//   }),
// }

/**
 * 原生写法为什么要逐层创建新数组、新对象？
 * React需要数据不可变性，引用数据类型直接改值会修改原引用，
 * 需要逐级拷贝修改，已保证数据不可变性，避免更新出问题以及不可预期的副作用
 */
/**
 * Immer 简化了什么，哪些查找仍然保留？
 * 简化了手动拷贝引用类型的部分，但是命中目标还是需要自己编码
 */
