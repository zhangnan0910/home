class demo {
    constructor(app){
        this.data = null;
        this.warp = app;
        this.init();
    }
    init(){
        this.dataJson();
        console.log(this.warp);
    }
    getJson(url){
        return new Promise((resolve,reject) => {
            let xml = null;
            if(window.XMLHttpRequest){
                xml = new XMLHttpRequest();
            }else{
                 xml = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xml.onreadystatechange = function(){
            if(xml.readyState === 4){
                if(xml.status === 200){
                    resolve(xml.responseText)
                }else{
                    reject(new Error('error'));
                }
            }
        }
        xml.open('get',url)
        xml.send(null);
        })
    }
    dataJson(){
        this.getJson('http://localhost:8090/data').then((resolve) => {
            this.data = JSON.parse(resolve).data;
            //console.log(this.data)
            this.create(this.data["movie_data"]);
        })
    }
    create(data){
        let html = `
        <header>
            <div>
                <span>影城</span>
                <span>国际影城</span>
                <span></span>
            </div>
            <h2>影院重装开业</h2>
        </header>
        <nav>
        `
        console.log(data);
        [...data].map((item) => {
            html+=`<div><img src = ${item.movie_img_url}></div> `
        })
        html+=`</nav>`;
        this.warp.innerHTML = html;
        let imgs = document.getElementsByTagName('img');
        [...imgs].map((val,ind) => {
             val.addEventListener('click',() => {
                    this.creatCont(ind,data)
             },true);
        })
    }
    creatCont(ind,data){
        let str = `
        <div>
            <h2>${data[ind].movie_name}</h2>
            <h2>${data[ind].movie_name}</h2>
            <ul>
        `
        let show = data[ind].show
        /*for(let arr in show){

        }*/
    }


}
export default demo;