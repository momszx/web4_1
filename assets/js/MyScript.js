function readFile(){
    jQuery.get('assets/data.txt',function (txt){
        let text = txt;
        let split = []; // Ebben van a data.txt tömbje soronként értelmezve
        let splitby$=[]; // Ebben van a soronként értelmezet adat feldarabolva $$$ onként
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
        console.log(splitby$);
        asd(splitby$)
    });
}
function asd(splitby$){
    let rnd =Math.floor(Math.random(0,splitby$.length) * 100) + 1
    document.getElementById('cikk').innerHTML+=splitby$[rnd][4];
}