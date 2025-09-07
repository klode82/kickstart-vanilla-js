class uPoint {

    #options;
    #version;
    #className;
    constructor(){

        this.#version = "1.0.0";
        this.#className = "uPoint";

        this.#options = {};

        this.defineActions();

        this.defineChanges();

        this.defineComponents();

        console.info(this.#className + " - ver. " + this.#version);
    }

    setOption(key, value){
        this.#options[key] = value;
    }

    getOption(key, defValue=null){
        if(this.#options.hasOwnProperty(key)){
            return this.#options[key];
        }
        return defValue;
    }


    defineComponents(){

    }



    defineActions(){
        document.addEventListener("click", (e) => {
            const el = e.target.closest('[data-action]');
            const elDataset = e.dataset;
            const action = elDataset.action;

            switch(action){
                case "foo":{

                }
            }
        });
    }



    defineChanges(){
        document.addEventListener("change", (e) => {
            const el = e.target.closest('[data-change]');
            const elDataset = e.dataset;
            const change = elDataset.change;

            switch(change){
                case "foo":{
                    
                }
            }
        });
    }

}

window.upoint = new uPoint();