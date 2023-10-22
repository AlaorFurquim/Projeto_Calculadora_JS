class CalcController{
    constructor(){
        this._operation =[];
        this._local = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl =document.querySelector("#data");
        this._timeEl =document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }
    
    initialize(){
      this.setDisplayDateTime();

      setInterval(() =>{
       this.setDisplayDateTime();
      },1000)
      
    }

    addEventListenerAll(element, events,fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event,fn,false);
        });
    }

    clearAll(){
      this._operation = [];
    }

    clearEntry(){
       this._operation.pop();
    }

    isOperator(value){
        return(['+','-','*','%','/'].indexOf(value) > -1);
            
      
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){
            this.calc();
        }
    }
    setLastNumberToDisplay(){
        
    }
    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
    }

    addOperation(value){


        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){
                this.setLastOperation(value);
            }else if(isNaN(value))
            {
                console.log(value);
            }else
            {
                this.pushOperation(value);
            }

        }else{
            if(this.isOperator(value)){
                this.pushOperation(value);

            }else{
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }

    }

    setError(){
        this.displayCalc = Error;
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    execBtn(value){
        switch(value){
            case 'AC':
                this.clearAll();
            break;

            case 'CE':
                this.clearEntry();
            break;

            case 'soma':
                this.addOperation('+'); 
            break;

            case 'subtracao':
                this.addOperation('-'); 
            break;
            
            case 'divisao':
                this.addOperation('/'); 
            break;

            case 'multiplicacao':
                this.addOperation('*'); 
            break;

            case 'porcento':
                this.addOperation('%'); 
            break;

            case 'igual':
                this.addOperation('='); 
            break;

            case 'ponto':
                this.addOperation('.'); 
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':   
                    this.addOperation(parseInt(value));                             
                break;
            default:
                this.setError();
                break;

        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn,index) =>{
            this.addEventListenerAll(btn,'click  drag', e =>{
              let txtbutton = btn.className.baseVal.replace("btn-","");

              this.execBtn(txtbutton);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });

        
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