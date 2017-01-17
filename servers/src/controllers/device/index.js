import createItem from './createItem';
import getItem from './getItem';
import removeItem from './removeItem';
import updateItem from './updateItem';
import list from './list';
import auth from '../../auth';
// import exportExcel from "./export";
import suggest from "./suggest";

export const routers = {
    'GET /': [auth.passport, auth.permission, list],
    // 'GET /manual/export': [auth.passport, auth.permission, exportExcel],
    'GET /manual/suggest': [auth.passport, auth.permission, suggest],
    'GET /:key/:type': [auth.passport, auth.permission, getItem],
    'POST /': [auth.passport, auth.permission, createItem],
    'DELETE /:key/:type': [auth.passport, auth.permission, removeItem],
    'PUT /:key/:type': [auth.passport, auth.permission, updateItem]
}

export const init = (router, sequelizeModel) => {

}

const type = {
    "": "other",
    "deviceAddComputerAction": "computer",
    "deviceAddPrinterAction": "printer",
    "deviceAddApAction": "ap"
};

export const config = {
    createItem: {
        type: type,
        removeAttributes: [

        ],
        suggest: {
            model_suggest: "model",
            brand_suggest: "brand",
            cpu_suggest: "cpu",
            disk_suggest: "disk",
            ram_suggest: "ram",
            os_suggest: "os"
        }
    },
    list: {

    },
    removeItem: {

    },
    updateItem: {
        type: type
    },
    getItem: {
        type: type
    }
}