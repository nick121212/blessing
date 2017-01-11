# CMDB 资产管理系统

## **资产信息字段说明**
### *公共信息*
| 字段           | 类型           | 说明       |
| ------------- |:-------------| ----------|
| NO            | string        | 固定资产编号 |
| hostname      | string        | 机器名      |
| brand         | string        | 品牌        |
| model         | string        | 型号        |
| deviceSn      | string        | SN号        |
| createdUser   | string        | 录入人       |
| used          | boolean       | 使用状态     |
| content       | string        | 备注        |
| _timestamp    | time          | 创建时间     |
| enteredAt     | time          | 入账时间     |

### *电脑信息*
| 字段           | 类型           | 说明       |
| ------------- |:------------- | ----------|
| user          | string        | 使用人      |
| cpu           | string        | CPU（多个）        |
| system        | string        | 操作系统（多个）        |
| disk          | string        | 硬盘（多个）        |
| ram           | string        | 内存（多个）        |
| os            | string        | 操作系统（多个）      |
| ip            | string        | IP地址（多个）       |

### *打印机*
| 字段           | 类型           | 说明       |
| ------------- |:-------------| :----------|
| position      | string        | 安放位置      |
| ip            | string        | IP地址（多个）       |

### *AP*
| 字段           | 类型           | 说明       |
| ------------- |:-------------| :----------|
| position      | string         | 安放位置      |
| mac            | string        | MAC地址（多个）       |

### 其他