class CalcController{
    constructor(){
        this._displayCalc = "0";
        this._currentDate;
        this.initialize();
    }
    
    initialize(){
        var displayCalcEl = document.querySelector("#display");
        var dateEl =document.querySelector("#data");
        var timeEl =document.querySelector("#hora");

        displayCalcEl.innerHTML = "4.789";
        dateEl.innerHTML = "14/09/2023";
        timeEl.innerHTML = "19:55";
    }

    // Metodo para retornar um valor ao atributo
    get displayCalc(){
        return this._displayCalc;
    }
    // Metodo para enviar um valor ao atributo
    set displayCalc(valor){
        this.displayCalc = valor; 
    }

    get dataAtual(){
        return this._currentDate;
    }
    set dataAtual(valor){
        this._dataAtual = valor;
    }
}