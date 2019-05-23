class Nodo {
    constructor(_padre, _content) {
        this.padre = _padre;
        this.content = _content;
        this.childsNodes = new Array();
        this.childNames = new Array();
        this.value = "__";
    }

    expandNodo(contentArray, _value) {

        let currentNode = this;

        //Si no hay mas nodos
        if (contentArray[0] == undefined) {
            this.value = _value;
            return;
        }

        //Si es el primer nodo
        if (this.childsNodes.length <= 0) {
            let node = new Nodo(this, contentArray[0]);
            this.childNames.push(contentArray[0]);
            this.childsNodes.push(node);

            let aux = contentArray;
            aux.shift();
            currentNode.childsNodes[currentNode.childsNodes.length - 1].expandNodo(aux, _value);

        }
        else {

            //Miro si el padre tiene algun nodo igual
            if (this.childNames.find(function (element, index) {

                if (element === contentArray[0]) {
                    let aux = contentArray;
                    aux.shift();
                    currentNode.childsNodes[index].expandNodo(aux, _value);
                    return true;
                }
                else
                    return false;

            })) {

            } else {
                let node = new Nodo(this, contentArray[0]);
                this.childNames.push(contentArray[0]);
                this.childsNodes.push(node);

                let aux = contentArray;
                aux.shift();
                currentNode.childsNodes[currentNode.childsNodes.length - 1].expandNodo(aux, _value);
            };
        }


    }

    getArrayNames(final) {

        if (final == undefined)
            final = false;

        let str = "";

        if (this.childsNodes.length > 0) {

            str += '"' + this.content + '": {';
            for (let i = 0; i < this.childsNodes.length; i++) {
                str += (i + 1 == this.childsNodes.length) ? this.childsNodes[i].getArrayNames(true) : this.childsNodes[i].getArrayNames(false);
            }
            if (final)
                str += "}";
            else
                str += "},";

        } else {

            //En el ultimo caso
            if (final)
                return '"' + this.content + '": "' + this.value + '"';
            else
                return '"' + this.content + '": "' + this.value + '",';
        }

        return str;

    }


}
