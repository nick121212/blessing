/**
 * Created by NICK on 16/8/9.
 */

import angular  from 'angular';

export var init = ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state("home", {
        url: "/",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {

        }
    });
};