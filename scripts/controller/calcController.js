class CalcController {
    constructor() {
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._local = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)

        this.setLastNumberToDisplay();
        this.pasteFromClipBoard();

        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick',e=>{
                this.toggleAudio();
            })
        })

    }

    toggleAudio(){
        this._audioOnOff = !this._audioOnOff;
    }

    pasteFromClipBoard(){
        document.addEventListener('paste', e=>{
            let Text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(Text);
        })
    }

    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    copyToClipBoard(){
        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
    }

    initKeyBoard(){
        document.addEventListener('keyup', e=>{
            this.playAudio();
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;             
    
                case 'Enter':
                case '=':
                    this.calc();
                    break;
    
                case '.':
                case ',':    
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                    break;
                
                case 'c':
                    if(e.ctrlKey) this.copyToClipBoard();
                    break;
    
            }

        });
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);


    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }

    }
    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {



            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }

        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() {
        let LastNumber = this.getLastItem(false);

        if (!LastNumber) LastNumber = 0;

        this.displayCalc = LastNumber;
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    calc() {
        let last = '';
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firtItem = this._operation[0];
            this._operation = [firtItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }
        else if (this._lastOperator.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }


        let result = this.getResult();
        if (last == '%') {

            result / 100;
            this._operation = [result];
        } else {

            this._operation = [result];
            if (last) this._operation.push(last);
        }


        this.setLastNumberToDisplay();
    }

    addOperation(value) {


        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);
            }
            else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);

            } else {
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }

        }

    }

    setError() {
        this.displayCalc = Error;
    }
    addDot() {
        let LastOperation = this.getLastOperation();

        if(typeof LastOperation === 'string' && LastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(LastOperation) || !LastOperation) {
            this.pushOperation('0.');
        } else{
            this.setLastOperation(LastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    execBtn(value) {

        this.playAudio();

        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
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
                this.calc();
                break;

            case 'ponto':
                this.addDot();
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

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click  drag', e => {
                let txtbutton = btn.className.baseVal.replace("btn-", "");

                this.execBtn(txtbutton);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });


    }

    setDisplayDateTime() {
        this.displayDate = this.dataAtual.toLocaleDateString(this._local)
        this.displayTime = this.dataAtual.toLocaleTimeString(this._local)
    }

    // Metodo para retornar um valor ao atributo
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    // Metodo para enviar um valor ao atributo
    set displayCalc(valor) {
        this._displayCalcEl.innerHTML = valor;
    }

    get displayTime() {
        this._timeEl.innerHTML;
    }

    set displayTime(valor) {
        this._timeEl.innerHTML = valor;
    }


    get displayDate() {
        this._dateEl.innerHTML;
    }


    set displayDate(valor) {
        this._dateEl.innerHTML = valor;
    }

    get dataAtual() {
        return new Date();
    }
    set dataAtual(valor) {
        this._dataAtual = valor;
    }
}