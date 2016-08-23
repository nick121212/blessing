/**
 * Created by NICK on 16/8/22.
 */

/**
 * 操作类型
 */
export enum ActionType{
    form = 1,
    confirm
}
/**
 * 操作的模型
 */
export interface ActionModel {
    // 唯一字符串
    key: string;
    // 操作的类型
    type: ActionType;
    // form操作的时候表单schema
    formSchema: string|Object;
    // form操作的时候字段schema
    dataSchema: string|Object;
    // confirm操作标题
    confirmTitle: string;
    // confirm操作显示内容
    confirmContent: string;
    // confirm操作ok按钮文字
    confirmOk: string;
    // confirm操作cancel按钮文字
    confirmCancel: string;
    // 成功后显示的文字
    successMsg: string;
}
