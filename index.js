

class App extends React.Component {
    constructor(state,props){       
        super(state,props); 
        this.state = {           
            
        }
    }
    render() {
        return (
            <div className="main-wrap" >
                <Header/>
                <Menu/>
                <Slider/>
                <InteractiveBlock/>
                <Footer/>
                
            </div>
            
           
        )
      
    }
}

//-----------------------Class------------------------------------------
class Header extends React.Component {
    
    render() {
        return (            
            <header>
                <div className="title">
                    <div className="header__logo">
                        <img className="logo" src="img/italian-pizza-logo.jpg" alt="logo"></img>
                        
                    </div>
                    <h1>Italian Pizza</h1></div>
                <div className="header__btn">
                    <select>
                        <option>Kiev</option>
                        <option>Lviv</option>
                        <option>Odessa</option>
                    </select>
                    <a href="#" className="bttr tick">Sign in</a>
                    <a href="#" className="bttr tick">Sign up</a>
                </div>
            </header>
        )
    }
}


class Menu extends React.Component {   
    render() {
        return (            
            <section className="menu-wrap">
                <a href="#" className="menu__btn">Pizza</a>
                <a href="#" className="menu__btn">Drinks</a>
                <a href="#" className="menu__btn">Dessert</a>
                <a href="#" className="menu__btn">Promo %</a>
            </section>           
        )
      
    }
}


let interval;
class Slider extends React.Component {
    constructor(state,props){       
        super(state,props); 
        this.state = {           
            arrUrl:["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpeg","img/7.jpg"],
            itemSliderURL:"img/1.jpg",
            indexItem:0
        }
    }
    showInterval(){
        return interval = setInterval(()=>{
            this.setState({
                indexItem:this.state.indexItem+1
            })
            if(this.state.indexItem>this.state.arrUrl.length-2){
                this.setState({
                    indexItem:0
                })
            }
        },5000)
    }
    componentDidMount(){
       this.showInterval()
    }
    handlerClickNext(){
        clearInterval(interval);
        this.showInterval()
        this.setState({
            indexItem:this.state.indexItem+1
        })
        if(this.state.indexItem>this.state.arrUrl.length-2){
            this.setState({
                indexItem:0
            })
        }
      
    }
    handlerClickPrevious(){
        clearInterval(interval);
        this.showInterval()
        this.setState({
            indexItem:this.state.indexItem-1
        })
         if(this.state.indexItem===0){
            this.setState({
                indexItem:this.state.arrUrl.length-1
            })
        }
       
    }
    
    handlerClickCircle(i){
        clearInterval(interval);
        this.showInterval()
        this.setState({
            indexItem:i
        })
    }
    render() {
        return (            
            <section className="slider-wrap">
                <img onClick={()=>{this.handlerClickPrevious()}} className="slider__previous-arrow" src="img/icons8-ios-glyph-60.png" alt="previous-arrow"></img>
                <div className="slider__picture">
                   <img className="item" src={this.state.arrUrl[this.state.indexItem]}></img>                   
                   
                   <div className="slider__circle-wrap">
                        <a href="#" className="btn-buy">Order</a>
                        {this.state.arrUrl.map((el,i)=>{
                            if(this.state.indexItem===i){
                                return <div key={i+"a"} onClick={()=>{this.handlerClickCircle(i)}} className="slider__circle color"></div>
                            }else 
                            return (
                                <div key={i} onClick={()=>{this.handlerClickCircle(i)}} className="slider__circle"></div>
                            )
                        })}
                    </div>                    
                </div>                
                <img onClick={()=>{this.handlerClickNext()}} className="slider__next-arrow" src="img/icons8-ios-glyph-60.png" alt="next-arrow"></img>
                
            </section>
           
        )
      
    }
}

 
let arrIdCell =[];
let error ="";
let disabledBtn=false;
let resultValue=0;
let arrTable = [1,2,3,4,5];

class InteractiveBlock extends React.Component {
    constructor(state,props){       
        super(state,props); 
        this.state = {           
            arrCurentTableIndex:[],
            arrObjectTable:[],
            objectTable:{},
            arrIdCell:[],
            arrClickCounter:[],
            clickCounter0:0,
            clickCounter1:0,
            clickCounter2:0,
            clickCounter3:0,
            clickCounter4:0,
            clickCounter:0,
            randomArray:[],
            numberCell:0,
            winCell:false,
            arrNumberCell:[],
            numberTable:0,
            btnPlayAgain:false
            // resultValue:0
            
        }
    }
    random(min,max){
        let rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand
    }
    getRandomArrayFromServer(){
        return Promise.resolve([
            [this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20)],
            [this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20)],
            [this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20)],
            [this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20)],
            [this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20),this.random(1,20)]
            
        ])
    }
    componentDidMount(){        
        let arr = [
            this.state.clickCounter0,
            this.state.clickCounter1,
            this.state.clickCounter2,
            this.state.clickCounter3,
            this.state.clickCounter4
        ];
        this.getRandomArrayFromServer()
            .then(res => {
                this.setState({                        
                    randomArray:res
                })
            })
         
        this.setState({
            arrClickCounter:arr           
        })
        
    }
    handlerClickShowCell(curentIndex,curentTableIndex){ 
        console.log(arrIdCell)
        arrIdCell.push(curentIndex+"a"+curentTableIndex);   
            this.state.arrClickCounter.map((counter,i,arr)=>{
                if(i===curentTableIndex){
                    let arrAll = [];
                    arr[i]=counter+1;
                    arrAll.push(...this.state.arrObjectTable,{
                            tableId:curentTableIndex,
                            clickCounter:arr[i],
                            arrIdCell:arrIdCell 
                    })

                    this.setState({  
                        arrObjectTable:arrAll ,
                        clickCounter:arr[i],           
                        arrIdCell:arrIdCell
                    
                    })  
                }
            })
    }
    handlerClickHideCross(curentIndex,curentTableIndex){
        if(arrIdCell.indexOf(curentIndex+"a"+curentTableIndex)!==-1){
            arrIdCell.splice(arrIdCell.indexOf(curentIndex+"a"+curentTableIndex),1);
        }        
        this.state.arrClickCounter.map((counter,i,arr)=>{
            if(i===curentTableIndex){
                let arrAll = [];
                arr[i]=counter-1
                arrAll.push(...this.state.arrObjectTable,{
                        tableId:curentTableIndex,
                        clickCounter:arr[i],
                        arrIdCell:arrIdCell 
                })               
                this.setState({  
                   
                    arrObjectTable:arrAll.splice(-1,1) ,
                    clickCounter:arr[i],           
                    arrIdCell:arrIdCell
                
                })  
            }
        })        
    }
    
    verificationClickCounter(curentTableIndex){
       
        for(let element of this.state.arrObjectTable){
            if( element.clickCounter>5 && element.tableId===curentTableIndex){
                error ="You must select only 5 items on the card";
                disabledBtn=false
                return false
            }
        }
        for(let element of this.state.arrObjectTable){
           
            if(element.clickCounter===5 && element.tableId===curentTableIndex){
                error ="",
                disabledBtn=true
                return true
            }            
        }
    }

    handlerClickSubmit(){
       
        if(this.state.btnPlayAgain===true){
            arrIdCell=[]
            this.setState({                              
                
                arrObjectTable:[],
                
                arrIdCell:[],
               
                
                arrClickCounter:[0,0,0,0,0],
                
                clickCounter:0,
               
                // numberCell:0,
                winCell:false,
                // arrNumberCell:[],
                // numberTable:0,
                
               
                
                btnPlayAgain:false                                  
               
            })
            this.getRandomArrayFromServer()
            .then(res => {
                this.setState({                        
                    randomArray:res
                })
            })
        }else{
            this.setState({
                btnPlayAgain:true
            });
            let arrNumberCell =[] 
            this.state.arrObjectTable.map((elem1,i1)=>{            
                 this.state.randomArray.map((elem2,i2)=>{                              
                        elem1.arrIdCell.map((elem3,i3)=>{                        
                            let splitelem = elem3.split("a")
                            let numberCell =Number(splitelem[0]);
                            let numberTable = Number(splitelem[1]);
                            if(i2===elem1.tableId){                            
                                if(elem2.indexOf(numberCell)!==-1 ){                                
                                    arrNumberCell.push(numberCell)
                                    this.setState({
                                        numberCell:numberCell,
                                        arrNumberCell:arrNumberCell,
                                        winCell:true,
                                        numberTable:numberTable                                    
                                    })
                                    
                                }else{
                                    this.setState({                               
                                        
                                        numberCell:numberCell,
                                        arrNumberCell:arrNumberCell,                                    
                                        numberTable:numberTable
                                    })
                                }
                            }
                        })    
                    
                })
            })
        }
        
        
    }
    
     getResult(result,tableIndex){
        
        if(result==true){
            resultValue +=1
                      
        }
        if( (arrTable.length-1)=== tableIndex  ){
            console.log("Your Result = ",resultValue);
                
        }
     
               
       
       
    }
    render() {
       
        return (
            <section className="interactiveBlock-wrap">
                <div className="interactiveBlock__title">
                    <h1>Interactive Game</h1>
                    
                </div>
                

                <div className="interactiveBlock__tables">
                {  
                    arrTable.map((el,k)=>{ 
                        
                        if(this.verificationClickCounter(k)===true ){
                            return(                            
                                <Table key={k}
                                    handlerClickShowCell = {this.handlerClickShowCell.bind(this)}
                                    handlerClickHideCross = {this.handlerClickHideCross.bind(this)}
                                    tableClass={"table border-green"}                                    
                                    k={k}                                   
                                    arrObjectTable={this.state.arrObjectTable}                                  
                                    arrIdCell={this.state.arrIdCell}
                                    numberCell={this.state.numberCell}
                                    winCell={this.state.winCell}
                                    arrNumberCell={this.state.arrNumberCell}
                                    randomArray={this.state.randomArray}
                                    numberTable={this.state.numberTable}
                                    getResult={this.getResult.bind(this)}
                                    
                                />
                            )
                        }else if(this.verificationClickCounter(k)===false ){                           
                            return(                            
                                <Table key={k}
                                    handlerClickShowCell = {this.handlerClickShowCell.bind(this)}
                                    handlerClickHideCross = {this.handlerClickHideCross.bind(this)}
                                    tableClass={"table border-red"}                                    
                                    k={k}                                   
                                    arrObjectTable={this.state.arrObjectTable}                                  
                                    arrIdCell={this.state.arrIdCell}
                                    numberCell={this.state.numberCell}
                                    winCell={this.state.winCell}
                                    arrNumberCell={this.state.arrNumberCell}
                                    randomArray={this.state.randomArray}
                                    numberTable={this.state.numberTable}
                                    getResult={this.getResult.bind(this)}                                   
                                />
                            )  
                        } else return(                            
                                <Table key={k}
                                    handlerClickShowCell = {this.handlerClickShowCell.bind(this)}
                                    handlerClickHideCross = {this.handlerClickHideCross.bind(this)}
                                    tableClass={"table"}                                    
                                    k={k}                                   
                                    arrObjectTable={this.state.arrObjectTable}                                  
                                    arrIdCell={this.state.arrIdCell}
                                    numberCell={this.state.numberCell}
                                    winCell={this.state.winCell}
                                    arrNumberCell={this.state.arrNumberCell}
                                    randomArray={this.state.randomArray}
                                    numberTable={this.state.numberTable}
                                    getResult={this.getResult.bind(this)}                                   
                                />
                            )  
                        
                    })
                }
                </div>
                <div className="message">
                    <p>{ error}</p>                   
                    <a onClick={()=>{this.handlerClickSubmit()}} href="#" className={(this.state.arrIdCell.length==25 && disabledBtn===true)?"btn-error ":"btn-error disabled"}>{this.state.btnPlayAgain===true?"Play Again":"Submit"}</a>
                    
                </div>
                
            </section>
            
           
        )
      
    }
}

let arrRow = [1,2,3,4,5];
let arrColumn = [1,2,3,4];

class Table extends React.Component { 
       
    render() {
        
        return (   
                  
            <table className={this.props.tableClass}>
                <tbody>
                
                {
                    arrRow.map((elem1,i)=>{
                        
                        return (
                            <tr key={i}>
                                {
                                    arrColumn.map((elem2,j)=>{                                   
                                        if(this.props.arrIdCell.indexOf(i*4+j+1+"a"+this.props.k)!==-1 ){                                            
                                            if(this.props.winCell==true &&  this.props.randomArray[this.props.k].indexOf(i*4+j+1)!==-1  ){

                                                this.props.getResult(this.props.winCell==true &&  this.props.randomArray[this.props.k].indexOf(i*4+j+1)!==-1,this.props.k)                                                
                                                
                                                return <td   className="table__cell winCell"  key={j}>{i*4+j+1}</td>
                                            }
                                            else {
                                                return <td onClick={()=>{this.props.handlerClickHideCross(i*4+j+1,this.props.k)}}  className="table__cross" key={j}>{i*4+j+1}</td> 
                                            }
                                        }                                 
                                        else {
                                            return <td onClick={()=>{this.props.handlerClickShowCell(i*4+j+1,this.props.k)}}  className="table__cell"  key={j}>{i*4+j+1}</td>
                                        }  
                                       
                                    })
                                }
                                
                            </tr>
                            
                        )
                        
                    })
                   
                }
                
                </tbody>
            </table>
           
        )
      
    }
}



class Footer extends React.Component {     
    render() {
        return (
            
            <footer>                
                <div className="footer-column">
                    <a href="https://www.facebook.com">Facebook</a>
                    <a href="https://www.linkedin.com/">Linkedin</a>
                    <a href="https://twitter.com/">Twitter</a>
                </div>
                <div className="footer-column">
                    <a href="https://github.com/">Github</a>
                    <a href="https://plus.google.com/discover">Google+</a>
                    <a href="https://www.pinterest.ru/">Pinterest</a>
                </div>
                <div className="footer-column">
                    <a href="https://www.youtube.com/">Youtube</a>
                    <a href="https://play.google.com/store">Google Play</a>
                    <a href="https://mail.google.com/mail/u/0/?tab=wm#inbox">Gmail</a>
                </div>
            </footer>           
        )      
    }
}



ReactDOM.render(<App/>, document.getElementById('root'));