let splitby$=[];
let a=0;
let i=0;
let distenceId=0;
let distenceId2=0;
let output=0;
let slider=0;
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
        slider_();
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
function slider_(){
    slider = document.getElementById("myRange");
    output = document.getElementById("demo");
    output.innerHTML = slider.value/100;

    slider.oninput = function() {
        output.innerHTML = this.value/100;
        checkboxChecked()
    }
    checkboxChecked()
}
function checkboxChecked(){
    var CheckBox = document.getElementById("checkbox").checked;
    if (!CheckBox){
        plausibility(slider);
    }
    else if(CheckBox){
        plausibilityMin3(slider);
    }
}
function plausibilityMin3(slider){
    let sliderValue=slider.value/100;
    let APlusI=(a+i);
    if(0>APlusI){
        APlusI=APlusI+2000;
    }
    else if(APlusI>2000){
        APlusI=APlusI-2000
    }
    let sorter=splitby$[APlusI][0];
    let sorter2=splitby$[APlusI][1];
    sorter.sort(sortBysecondColum);
    sorter2.sort(sortBysecondColum);
    function sortBysecondColum(a,b){
        if(a[1]===b[1]){
            return 0;
        }
        else {
            return (a[1]<b[1]) ? -1 : 1;
        }
    }
    let nums=[];
    let nums2=[];
    let ArrayN;
    let ArrayN2;
    for(t=0;t<sorter.length;t++){
        nums.push(sorter[t][1]);
    }
    for(t=0;t<sorter2.length;t++){
        nums2.push(sorter2[t][1]);
    }
    let goal = sliderValue;
    var closest = nums.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    var closest2 = nums2.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    for(t=0;t<sorter.length;t++){
        if(sorter[t][1]==closest){
            ArrayN=t;
        }
    }
    for(t=0;t<sorter2.length;t++){
        if(sorter2[t][1]==closest2){
            ArrayN2=t;
        }
    }
    if((ArrayN-1)>0){
        document.getElementById("RecomendedTitle").innerHTML = "<div>"+sorter[ArrayN-1][0]+" "+sorter[ArrayN-1][1]+"</div>";
    }
    else {
        document.getElementById("RecomendedTitle").innerHTML = "<div>"+"Nincs ilyen elem"+"</div>";
    }
    document.getElementById("RecomendedTitle").innerHTML += "<div>"+sorter[ArrayN][0]+" "+sorter[ArrayN][1]+"</div>";
    if((ArrayN+1)<sorter.length){
        document.getElementById("RecomendedTitle").innerHTML += "<div>"+sorter[ArrayN+1][0]+" "+sorter[ArrayN+1][1]+"</div>";
    }
    else {
        document.getElementById("RecomendedTitle").innerHTML += "<div>"+"Nincs ilyen elem"+"</div>";
    }
    if((ArrayN2-1)>0){
        document.getElementById("RecomendedTitleOther").innerHTML = "<div>"+sorter2[ArrayN2-1][0]+" "+sorter2[ArrayN2-1][1]+"</div>";
    }
    else {
        document.getElementById("RecomendedTitleOther").innerHTML = "<div>"+"Nincs ilyen elem"+"</div>";
    }
    document.getElementById("RecomendedTitleOther").innerHTML += "<div>"+sorter2[ArrayN2][0]+" "+sorter2[ArrayN2][1]+"</div>";
    if((ArrayN2+1)<sorter2.length){
        document.getElementById("RecomendedTitleOther").innerHTML += "<div>"+sorter2[ArrayN2+1][0]+" "+sorter2[ArrayN2+1][1]+"</div>";
    }
    else {
        document.getElementById("RecomendedTitleOther").innerHTML += "<div>"+"Nincs ilyen elem"+"</div>";
    }

}
function plausibility(slider){
    let sliderValue=slider.value/100;
    let APlusI=(a+i);
    if(0>APlusI){
        APlusI=APlusI+2000;
    }
    else if(APlusI>2000){
        APlusI=APlusI-2000
    }
    let sorter=splitby$[APlusI][0];
    let sorter2=splitby$[APlusI][1];
    sorter.sort(sortBysecondColum);
    sorter2.sort(sortBysecondColum);
    function sortBysecondColum(a,b){
        if(a[1]===b[1]){
            return 0;
        }
        else {
            return (a[1]<b[1]) ? -1 : 1;
        }
    }
    let nums=[];
    let nums2=[];
    let ArrayN;
    let ArrayN2;
    for(t=0;t<sorter.length;t++){
        nums.push(sorter[t][1]);
    }
    for(t=0;t<sorter2.length;t++){
        nums2.push(sorter2[t][1]);
    }
    let goal = sliderValue;
    var closest = nums.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    var closest2 = nums2.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    for(t=0;t<sorter.length;t++){
        if(sorter[t][1]==closest){
            ArrayN=t;
        }
    }
    for(t=0;t<sorter2.length;t++){
        if(sorter2[t][1]==closest2){
            ArrayN2=t;
        }
    }
    document.getElementById("RecomendedTitle").innerHTML = "<div>"+sorter[ArrayN][0]+" "+sorter[ArrayN][1]+"</div>";
    document.getElementById("RecomendedTitleOther").innerHTML = "<div>"+sorter2[ArrayN2][0]+" "+sorter2[ArrayN2][1]+"</div>";
}

//Ez adja hozzá az elemeket a Selectsonhöz
function addOption(a){
    var x = document.getElementById("mySelect");
    for (d=a;d<a+20;d++) {
        var option = document.createElement("option");
        if (0<=d&&d<2000){
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
    checkboxChecked();
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
    for (u=0;u<20;u++){
        x.options.remove(0);
    }
}
