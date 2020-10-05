function readFile(){
    jQuery.get('assets/data.txt',function (txt){
        var text = txt;
        var split = [];
        split =text.split('$$$');
        var json =JSON.stringify(split)
        //var data=[];
        /*for (i=0;i<split.length;i+5){
          //  var myObj={labels:split[i],special_labels:split[i+1],origina_labels:split[i+2],title:split[i+3],text:split[i+4]};
            //data.push(myObj);
            console.log(i);
        }*/
        console.log(json);

    });
}