function readFile(){
    jQuery.get('assets/data.txt',function (txt){
        let text = txt;
        let split = [];
        split =text.split('$$$');


        //var data=[];
        for (i=0;i<split.length;i++){
            console.log(i);
            

        }
        //split.forEach(
          //  element => asd(element)
        //);

        //console.log (split);
    });
}
function asd(element){

    //document.getElementById('output').innerHTML+=element;
}