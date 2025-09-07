/**
 * 
 * KICKSTART VANILLA JS
 * 
 * @author Stefano Surricchio
 * @version 1.0.0
 * @package kickstart-vanilla-js
 * 
 * @description
 * Questa classe è la base di una qualunque applicazione Web.
 * Non utilizza librerie aggiuntive per le operazioni preliminari, come JQuery.
 * E' basato fondamentalmente su Vanilla JS.
 * 
 * La proprietà principale è `options` e prevede tutte le variabili utilizzate all'interno
 * della classe.
 * 
 */



class App {

    /**
     * @type Object
     * @description
     * Contiene tutta la parametrizzazione dell'applicativo. E' possibile definire ulteriori
     * parametri inserendo le chiavi nella dichiarazione all'interno del `constructor`.
     */
    #options;
    
    constructor(){

        /**
         * I parametri imprescindibili sono:
         *  - version : permette di verificare l'effettiva versione in esecuzione sulla Console;
         *  - className : Si utilizza come standard per i Log;
         *  - baseEndPoint : Esempio di base per chiamate API;
         *  - templates : Se si vuole gestire l'uso di snippets per costruire contenuti dinamici,
         *                si possono dichiarare i templates nella struttura che segue:
         *                {
         *                    code : identifica un codice univoco per chiamate API (ad esempio);
         *                    content : detiene il contenuto del file dello snippet;
         *                }
         */
        this.#options = {
            "version": "1.0.0",
            "className": "APP",
            "baseEndPoint": "http://localhost:5001/api",
            "dataSetContentKey": "data-itemset",
            "templates":{
                "itemSectionOperatorSelector":{
                    "code":"item-section-operator-selector",
                    "content":""
                }
            }
        };

        this.#options = {};

        this.defineActions();

        this.defineChanges();

        this.defineComponents();

        console.info(`${this.getOption("className")} ver. ${this.getOption("version")}`);
    }


    /**
     * Imposta un valore per una chiave da inserire all'interno dell'oggetto parametrico `options`
     * @param {string} key 
     * @param {any} value 
     */
    setOption(key, value){
        this.#options[key] = value;
    }


    /**
     * Preleva il valore a partire dalla chiave `key`, se non esiste restituisce il valore di default `defValue`.
     * @param {string} key 
     * @param {any|null} defValue 
     * @returns 
     */
    getOption(key, defValue=null){
        if(this.#options.hasOwnProperty(key)){
            return this.#options[key];
        }
        return defValue;
    }


    /**
     * Preleva tutti i campi di inserimento (`input` e `textarea` tag), dove appare un metadata specifico.
     * Il valore di default di questo metadata è `options.dataSetContentKey`, ma si può specificare diversamente,
     * utilizzando il parametro `dataSetContentKey` della funzione.
     * In particolare, nel caso di selezioni multiple, come `select` e `checkbox`, non potendo sapere in anticipo se i valori saranno più di uno,
     * nel caso di questi particolari campi, il valore o i valori vengono raccolti in un Array.
     * Internamente, la funzione gestisce una variabile di tipo `Object` che raccoglie tutti i valori dei campi di inserimento identificati.
     * 
     * @param {string} dataSetContent : indica la chiave per la selezione del campo di inserimento, come valore del metatada `dataSetContentKey`;
     * @param {string|null} dataSetContentKey : indica un metadata differente da quello di default;
     * @returns {object} : Ritorna un oggetto dove ogni chiave è specificato dall'attributo `name` del campo di inserimento, ed il valore indica
     *                     il contenuto dell'attributo `value` del DOMElement.
     */
    getDataFields(dataSetContent, dataSetContentKey=null){
        if(dataSetContentKey === null) dataSetContentKey = this.getOption("dataSetContentKey");
        const fields = document.querySelectorAll("[data-itemtype='" + dataSetContent + "']");
        let dataFields = {};
        fields.forEach( item => {
            let fieldName = item.getAttribute("name");
            let fieldValue = item.value;
            let fieldType = item.getAttribute("type");
            switch(fieldType){
                case "checkbox":
                case "select":
                    if(!dataFields.hasOwnProperty(fieldName))
                        dataFields[fieldName] = [];
                    if(item.checked)
                        dataFields[fieldName].push(fieldValue);
                break;
                default:
                    dataFields[fieldName] = fieldValue;
                break;
            }
        })
        return dataFields;
    }


    /**
     * Ritorna l'oggetto di `templates` indicato dalla chiave di gestione. Da non confondere con il codice.
     * @param {string} key : indica la chiave alla quale è associato l'oggetto che identifica lo snippet o porzione di template.
     * @returns {object|null} : ritorna l'oggetto Template se esiste la chiave, altrimenti ritorna `null`.
     */
    getTemplate(key){
        if(Object.keys(this.#options.templates).includes(key))
            return this.#options.templates[key];
        return null;
    }










    /**
     * Se l'applicativo dovrà adottare altre librerie, si possono inizializzare in questa funzione.
     * Alcune delle inizializzazioni utilizzate:
     *  - Lucide (icone) https://lucide.dev;
     *  - Full Calendar https://fullcalendar.io/docs;
     *  - 
     */
    defineComponents(){

    }



    /**
     * Dichiarazione dell'EventHandler sull'azione `click`. Viene considerato solo l'oggetto che contiene
     * come meta-data `action` (attributo `data-action`).
     * Viene poi analizzata l'azione associata tramite uno switch. In caso di default, viene esposto un messaggio
     * di errore indicando l'azione non riconosciuta.
     */
    defineActions(){
        document.addEventListener("click", (e) => {
            const el = e.target.closest('[data-action]');
            if(el === null) return;
            const elDataset = el.dataset;
            if(!elDataset.hasOwnProperty("action")) return;
            const action = elDataset.action;

            switch(action){
                case "foo":{

                    break;
                }

                default:{
                    console.error(`Action ${action} not recognized.`);
                    break;
                }
            }

            return;
        });
    }



    defineChanges(){
        document.addEventListener("change", (e) => {
            const el = e.target.closest('[data-change]');
            if(el === null) return;
            const elDataset = el.dataset;
            if(!elDataset.hasOwnProperty("change")) return;

            switch(change){
                case "foo":{
                    break;
                }

                default:{
                    console.error("Changes ${change} not recognized.");
                    break;
                }
            }

            return;
        });
    }

}


/**
 * Inizializzazione della Classe.
 */
window.app = new App();