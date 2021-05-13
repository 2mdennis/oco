import "@babel/polyfill";
import bm from './config';
import animate from './animate';
import eventListeners from './events';
import form from "./form";

//Add global event listeners to the events object
bm.events = {
    subscribe: (type, el, ev) => {
        el.addEventListener(type, ev, true);
        bm.state.events = bm.state.events || [];
        if (!bm.state.events.find((elev) => { return elev.el === el; }))
            bm.state.events.push({el: el, events: []});

        let elEvents = bm.state.events.find((elev) => { return elev.el === el; });
        elEvents.events.push({type: type, event: ev});
    },
    unsubscribe: (type, el, ev) => {
        bm.state.events = bm.state.events || [];
        let elEvents = bm.state.events.find((elev) => { return elev.el === el; });
        const elEvent = elEvents.events.find(event => event.type === type);
        el.removeEventListener(type, elEvent.event, true);
        elEvents = elEvents.events.filter(event => event.type !== type);
        for (var i in bm.state.events) {
            if (bm.state.events[i].el === el) {
                bm.state.events[i].events = elEvents;
                if (bm.state.events[i].events.length === 0) {
                    bm.state.events.splice(i, 1);
                }
                break;
            }
        }
        ev();
    }
};

bm.request = {
    get: (url = ``, data = {}) => {
        return new Promise((resolve, reject) => {
            fetch(url, data).then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(response);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    post: (url = ``, data = {}, headers = {"Content-Type": "application/json"}) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "post",
                headers: headers,
                body: data
            }).then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
};

(() => {
    eventListeners();
    form();
	animate();
    window.addEventListener('scroll', animate);
})();