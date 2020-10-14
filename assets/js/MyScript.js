let splitby$=[];
let a=0;
let i=0;
let distenceId=0;
let distenceId2=0;
function readFile(){
    jQuery.get('assets/data.txt',function (txt){
        let text = txt;
        let split = []; // Ebben van a data.txt tömbje soronként értelmezve
         // Ebben van a soronként értelmezet adat feldarabolva $$$ onként
        split =text.split('\n'); // itt darabolom fel sorokra
        for (z=0;z<split.length;z++){
            splitby$.push(split[z].split('$$$')); // itt darabolom fel a sorokat $$$ onként
        }
        for (q=0;q<splitby$.length;q++){
            for (n=0;n<3;n++){
                let splitByLabel=(splitby$[q][n].split("__label__")); // az első három tömböta mit tartalmaz labelt feldarabolom
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
                splitby$[q][n]=splitByLabel;
            }
        }
        slider();
        openLook(splitby$)
        addOption(a)

    });
}
function openLook(){
    let help =splitby$[0][2][3];
    let help2 =help.split(" ");
    var x = document.getElementById("Title");
    //let rnd =Math.floor(Math.random(0,splitby$.length) * 100) + 1
    document.getElementById('cikk').innerHTML+=splitby$[0][4];
    document.getElementById("Title").innerHTML += "<div>"+ splitby$[0][2][0]+"</div>";
    document.getElementById("Title").innerHTML += "<div>"+ splitby$[0][2][1]+"</div>";
    document.getElementById("Title").innerHTML += "<div>"+ splitby$[0][2][2]+"</div>";
    document.getElementById("Title").innerHTML += "<div>"+ help2[0]+"</div>";
    document.getElementById("OriginalTitle").innerHTML += "<div>"+help2[1]+"</div>";
    document.getElementById("OriginalTitle").innerHTML += "<div>"+help2[2]+"</div>";
}
//Ez írja ki a valószíbűséget
function slider(){
    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    output.innerHTML = slider.value/100;

    slider.oninput = function() {
        output.innerHTML = this.value/100;
        plausibility(slider)
    }
    plausibility(slider)
}
function plausibility(slider){
    let sliderValue=slider.value/100;
    let distence=splitby$[a+i][0][0][1]-sliderValue;
    let distence2=splitby$[a+i][1][0][1]-sliderValue;
    let value;
    let value2;
    let valami=a+i;
    if(valami>2000){
        valami=valami-2000;
    }
    else if(valami<0){
        valami=valami+2000;
    }
    for(t=0;t<splitby$[valami][0].length;t++){
        value=splitby$[valami][0][t][1]-sliderValue;
        value2=splitby$[valami][1][t][1]-sliderValue;
        if(value<0){
            value=-value;
        }
        if(value2<0){
            value2=-value2;
        }
        if(distence>value){
            distence=value;
            distenceId=t;
        }
        if(distence2>value2){
            distence2=value2;
            distenceId2=t;
        }
    }
    document.getElementById("RecomendedTitle").innerHTML = "<div>"+splitby$[0][0][distenceId][0]+" "+splitby$[0][0][distenceId][1]+"</div>";
    document.getElementById("RecomendedTitleOther").innerHTML = "<div>"+splitby$[0][1][distenceId][0]+" "+splitby$[0][1][distenceId][1]+"</div>";
}

//Ez adja hozzá az elemeket a Selectsonhöz
function addOption(a){
    var x = document.getElementById("mySelect");
    for (d=a;d<a+20;d++) {
        var option = document.createElement("option");
        console.log("a:"+a);
        console.log("d:"+d);
        if (0<d&&d<2000){
            option.text = splitby$[d][3];
            x.add(option);
        }
        else if(d>2000) {
            option.text=splitby$[d-2000][3];
            x.add(option);
        }
        else  if(d<0){
            option.text=splitby$[d+2000][3];
            x.add(option);
        }
    }
}
//Ez felelős a kiválasztoot cikk szövegét
function SelectChange() {
    var x = document.getElementById("mySelect");
     i = x.selectedIndex;
    if ((a+i)<2000&&0<(a+i)){
        let help= splitby$[a+i][2][splitby$[a+i][2].length-1]

        help=help.toString();

        let help2 =help.split(" ");
        document.getElementById("Title").innerHTML = "<div>"+ splitby$[a+i][2][0]+"</div>";
        for(q=1;q<splitby$[a+i][2].length-1;q++){
            document.getElementById("Title").innerHTML += "<div>"+ splitby$[a+i][2][q]+"</div>";
        }
        document.getElementById("Title").innerHTML += "<div>"+ help2[0]+"</div>";
        document.getElementById("OriginalTitle").innerHTML = "<div>"+ help2[1]+"</div>";
        for(q=2;q<help2.length;q++){
            document.getElementById("OriginalTitle").innerHTML += "<div>"+ help2[q]+"</div>";
        }
        document.getElementById("cikk").innerHTML = splitby$[a+i][4];
    }
    else if((a+i>2000)) {
        let help= splitby$[(a+i)-2000][2][splitby$[(a+i)-2000][2].length-1];
        help=help.toString();
        let help2 =help.split(" ");
        document.getElementById("Title").innerHTML = "<div>"+ splitby$[(a+i)-2000][2][0]+"</div>";
        for(q=1;q<splitby$[(a+i)-2000][2].length-1;q++){
            document.getElementById("Title").innerHTML += "<div>"+ splitby$[(a+i)-2000][2][q]+"</div>";
        }
        document.getElementById("Title").innerHTML += "<div>"+ help2[0]+"</div>";
        document.getElementById("OriginalTitle").innerHTML = "<div>"+ help2[1]+"</div>";
        for(q=2;q<help2.length;q++){
            document.getElementById("OriginalTitle").innerHTML += "<div>"+ help2[q]+"</div>";
        }
        document.getElementById("cikk").innerHTML = splitby$[(a+i)-2000][4];
    }
    else if((a+i)<0){
        let help= splitby$[(a+i)+2000][2][splitby$[(a+i)+2000][2].length-1];
        help=help.toString();
        let help2 =help.split(" ");
        document.getElementById("Title").innerHTML = "<div>"+ splitby$[(a+i)+2000][2][0]+"</div>";
        for(q=1;q<splitby$[(a+i)+2000][2].length-1;q++){
            document.getElementById("Title").innerHTML += "<div>"+ splitby$[(a+i)+2000][2][q]+"</div>";
        }
        document.getElementById("Title").innerHTML += "<div>"+ help2[0]+"</div>";
        document.getElementById("OriginalTitle").innerHTML = "<div>"+ help2[1]+"</div>";
        for(q=2;q<help2.length;q++){
            document.getElementById("OriginalTitle").innerHTML += "<div>"+ help2[q]+"</div>";
        }
        document.getElementById("cikk").innerHTML = splitby$[(a+i)+2000][4];
    }
}
function addPlus(){
    a++;
    removeSelect();
    addOption(a)
    SelectChange();
}
function addMinus(){
    a--;
    removeSelect();
    addOption(a)
    SelectChange();
}
function addPlus20Element(){
    a+=20;
    removeSelect();
    addOption(a)
    SelectChange();
}
function addMinus20Element(){
    a-=20;
    removeSelect();
    addOption(a)
    SelectChange();
}
function removeSelect() {
    var x = document.getElementById("mySelect");
    for (i=0;i<20;i++){
        x.options.remove(i);
    }
}
