import GestionnaireTache from "./GestionnaireTache.js";

export class Router {
    #routes;
    #elTriggers;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": this.#appelerFormulaire,
            "taches": this.#appelerTaches,
            "accueil":  this.#appelerTaches
        };
        this.#elTriggers = document.querySelector('[data-js-trigger]');
        this.#init();
    }

    #init() {
        this.#elTriggers.addEventListener('click', (e) => {
            if(e.target.dataset.jsHref) {
                const href = e.target.dataset.jsHref;
                history.pushState({}, '', href);
                this.#gererChangementUrl();
            }
        });

        window.addEventListener('popstate', () => this.#gererChangementUrl());
        this.#gererChangementUrl();
    }

    /**
     * gerer et aiguiller les requêtes selon le url de la page
     */
    #gererChangementUrl() {
        const hash = location.hash.slice(1) || '/';

        const fragments = hash.split('/');
        const routeFinale = this.#routes[hash] || this.#routes['accueil'];
        let id;

        if(fragments[1] != undefined && fragments[1] != '') {
            id = history.state.id;
        } 

        if(id) routeFinale(id);
        else routeFinale();
    }

    #appelerFormulaire() {
        const eventForm = new Event('ouvrirFormulaire');
        document.dispatchEvent(eventForm);
    }

    #appelerTaches() {
        const eventTaches = new Event('ouvrirTaches');
        document.dispatchEvent(eventTaches);
    }
}