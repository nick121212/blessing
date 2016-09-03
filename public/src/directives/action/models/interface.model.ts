/**
 * Created by NICK on 16/8/22.
 */

/**
 * 操作类型
 */
export enum MethodType{
    GET,
    POST,
    DELETE,
    PUT,
    HEAD
}


export interface IJpp {
    set?: {[id: string]: string},
    copy?: {[id: string]: string},
    move?: {[id: string]: string},
    del?: {[id: string]: string}
}

/**
 * 操作的模型
 */
export interface IInterfaceModel {
    // 唯一字符串
    key: string;
    // 调用方法
    method: MethodType;
    // 接口服务器地址
    address: string;
    // 端口
    port?: number;
    // 接口地址
    path: string;
    // 接口所对应的服务器key
    serverKey?: string;
    // 接口所需参数,false 为不需要参数
    params?: boolean|Object;
    // 是否是restful接口
    isRestful: boolean;
    // put和delete请求时候带参数
    idFieldPath?: string;
}