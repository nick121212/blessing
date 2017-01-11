import * as tv4 from "tv4";
import * as validator from 'validator';

class CustomFormat {
    constructor() {
        // 验证email
        tv4.addFormat("email", (data, schema): any => {
            if (validator.isEmail(data)) {
                return true;
            }

            return { code: 10002 };
        });

        // 验证手机
        tv4.addFormat("mobile", (data, schema): any => {
            if (validator.isMobilePhone(data, "zh-CN")) {
                return null;
            }

            return { code: 10003 };
        });

        // 验证json
        tv4.addFormat("json", (data, schema): any => {
            if (validator.isJSON(data)) {
                return null;
            }

            return { code: 10004 };
        });

        tv4.addFormat("url-ip", (data, schema): any => {
            if (validator.isURL(data)) {
                return null;
            }
            return { code: 10005 };
        });

        tv4.addFormat("ip", (data, schema): any => {
            if (validator.isIP(data)) {
                return null;
            }
            return { code: 10006 };
        });

        tv4.setErrorReporter(function (error, data, schema) {
            return "Error code: " + error.code;
        });
        // tv4.defineError("FORMATURLIP", 10005, "ip或域名格式不正确");
    }
}

export const customFormats = new CustomFormat();

