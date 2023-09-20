class CalcController{
    constructor(){
        this._local = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl =document.querySelector("#data");
        this._timeEl =document.querySelector("#hora");
        this._currentDate;
        this.initialize();
    }
    
    initialize(){
      this.setDisplayDateTime();

      setInterval(() =>{
       this.setDisplayDateTime();
      },1000)
      
    }

    setDisplayDateTime(){
        this.displayDate = this.dataAtual.toLocaleDateString(this._local)
        this.displayTime = this.dataAtual.toLocaleTimeString(this._local)
    }

    // Metodo para retornar um valor ao atributo
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    // Metodo para enviar um valor ao atributo
    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor; 
    }

    get displayTime(){
        this._timeEl.innerHTML;
    }

    set displayTime(valor){
        this._timeEl.innerHTML = valor;
    }


    get displayDate(){
        this._dateEl.innerHTML;
    }

    
    set displayDate(valor){
        this._dateEl.innerHTML = valor;
    }

    get dataAtual(){
        return  new Date();
    }
    set dataAtual(valor){
        this._dataAtual = valor;
    }
}