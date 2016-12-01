import testItem from './testItem';
import execCmdList from './getExecuteCommandList';
import execCmdResList from './getExecuteCommandResultList';
import auth from '../../auth';

export const routers = {
    'POST /manual/test': [auth.passport, testItem],
    'GET /manual/execCmdList': [auth.passport, execCmdList],
    'GET /manual/execCmdResList': [auth.passport, execCmdResList]
}

export const init = (router, sequelizeModel) => {

}

export const config = {
    createItem: {

    },
    list: {

    },
    removeItem: {

    },
    updateItem: {

    },
    getItem: {

    }
}