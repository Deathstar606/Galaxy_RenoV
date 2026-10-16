import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Services } from './services';
import { Tools } from './tools';
import { Auth } from './auth';
import { Reservations } from './reservation';
import { Contacts } from './contact';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            services: Services,
            tools: Tools,
            reservations: Reservations,
            contacts: Contacts,
            auth: Auth
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}