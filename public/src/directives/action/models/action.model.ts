/**
 * Created by NICK on 16/8/22.
 */

/**
 * 操作类型
 */
import {IInterfaceModel} from "./interface.model";
export enum ActionType {
    none = 0,
    list = 1,
    form = 2,
    wizard = 3,
    confirm = 4
}

export interface IConfirm {
    // confirm操作标题
    confirmTitle: string;
    // confirm操作显示内容
    confirmContent: string;
    // confirm操作ok按钮文字
    confirmOk?: string;
    // confirm操作cancel按钮文字
    confirmCancel?: string;
}

export interface ISchemaForm {
    // form操作的时候表单schema
    formSchema?: string | Array<Object>;
    // form操作的时候字段schema
    dataSchema?: string | Object;
    // form标题
    title?: string;
    // 状态
    status?: number;
    // 数据的JSON路径,默认应该为"/"
    path?: string;
}

export interface IWizard {
    defaultSchema?: ISchemaForm;
    // schemas?: Array<ISchemaForm>;
    actions: Array<string|IActionModel>;
}

export interface IColumn {
    content: string;
    title: string;
    name?: string;
    sort?: string;
    unit?: string;
}

export interface IClientData {
    total?: number;
    rows?: Array<any>;
}

export interface IQueryData {
    limit?: number;
    offset?: number;
    page?: number;
    where?: any;
    attributes?: any;
    order?: string;
}

export interface IList {
    columns: Array<IColumn>;
    itemToolbars?: Array<Object>;
    toolbars?: Array<Object>;
    searchToolbars?: Array<Object>;
    searchActionKey?: String;
    showSearchBtn?: boolean;
    showRefreshBtn?: boolean;
    showSearchPanel?: boolean;
}

export interface IItemActionSet {
    key: string,
    condition?: string;
}


/**
 * 操作的模型
 */
export interface IActionModel {
    // 唯一字符串
    key: string;
    // 图标
    icon?: string;
    // 标题
    title?: string;
    // 操作的类型
    type: ActionType;
    // confirm 操作
    confirm?: IConfirm,
    // form 操作
    form?: ISchemaForm;
    // 多表单操作
    wizard?: IWizard;
    // 列表操作
    list?: IList;
    // 开启条件
    condition?: string;
    // 子操作
    itemActions?: Array<IItemActionSet>;
    // 子操作
    actions?: Array<IActionModel|string>;
    // 接口列表
    interfaces?: Array<IInterfaceModel>;
    // 成功后显示的文字
    successMsg?: string;
    // 执行成功后是否刷新列表
    refreshList?: boolean ;
    // 执行成功后是否需要关闭dialog
    closeDialog?: boolean;
}