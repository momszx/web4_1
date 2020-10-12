let splitby$=[];
let a=0;
function readFile(){
    jQuery.get('assets/data.txt',function (txt){
        let text = txt;
        let split = []; // Ebben van a data.txt tömbje soronként értelmezve
         // Ebben van a soronként értelmezet adat feldarabolva $$$ onként
        split =text.split('\n'); // itt darabolom fel sorokra
        for (i=0;i<split.length;i++){
            splitby$.push(split[i].split('$$$')); // itt darabolom fel a sorokat $$$ onként
        }
        for (i=0;i<splitby$.length;i++){
            for (n=0;n<3;n++){
                let splitByLabel=(splitby$[i][n].split("__label__")); // az első három tömböta mit tartalmaz labelt feldarabolom
                splitByLabel.shift(); // kidobom a felesleges " "
                for (k=0;k<splitByLabel.length;k++){
                    let splitBySpace;
                    if (n<2){
                        splitBySpace=splitByLabel[k].split(" "); // ketté szedem a labelt és a valószinuséget
                        splitBySpace.pop();
                        splitByAt =splitBySpace[0]; // bemásolom a labeleket
                    }
                    else {
                        splitByAt=splitByLabel[k];
                    }
                    let label =splitByAt.split('@@'); // szétbontom a labelt 2 részre ha tartalmaz @@
                    if(label.length>1){
                        labelBuilder=label[0]+" "+label[1]; // össze rakom a labelt újra
                        label=labelBuilder; //vissza adom a kész labet
                    }
                    splitByAt=label;
                    if (n<2){
                        splitBySpace[0]=splitByAt;
                        splitByLabel[k]=splitBySpace;
                    }
                    else {
                        splitByLabel[k]=splitByAt;
                    }
                }
                splitby$[i][n]=splitByLabel;
            }
        }
        asd(splitby$)
        addOption(a)
    });
}
function asd(splitby$){
    let rnd =Math.floor(Math.random(0,splitby$.length) * 100) + 1
    document.getElementById('cikk').innerHTML+=splitby$[rnd][4];
}
//Ez írja ki a valószíbűséget
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value/100;

slider.oninput = function() {
    output.innerHTML = this.value/100;
}
//Ez adja hozzá az elemeket a Selectsonhöz
function addOption(a){
    var x = document.getElementById("mySelect");

    for (d=a;d<a+20;d++) {
        var option = document.createElement("option");
        if (d<2000){
            option.text = splitby$[d][3];
            x.add(option);
        }
        else {
            option.text=splitby$[d-2000][3];
            x.add(option);
        }
    }
}
function SelectChange() {
    var x = document.getElementById("mySelect");
    var i = x.selectedIndex;
    if ((a+i)<2000){
        document.getElementById("cikk").innerHTML = splitby$[a+i][4];
    }
    else {
        document.getElementById("cikk").innerHTML = splitby$[(a+i)-2000][4];
    }
}
function addPlus(){
    a++;
    removeSelect();
    addOption(a)
}
function addMinus(){
    a--;
    removeSelect();
    addOption(a)
}
function addPlus20Element(){
    a+=20;
    removeSelect();
    addOption(a)
}
function addMinus20Element(){
    a-=20;
    removeSelect();
    addOption(a)
}
function removeSelect() {
    var x = document.getElementById("mySelect");
    for (i=0;i<20;i++){
        x.options.remove(i);
    }
}
