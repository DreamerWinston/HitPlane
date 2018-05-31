




//游戏配置

function initConfig(){
    // 敌机数量
    enemyCount = 100;

    // 游戏屏幕
    screen = document.getElementById('screen');

    // 当前敌机数量
    currentPlaneCount =0;

    // 最大同屏飞机数
    maxPlaneCount =50;

    // 子弹数量
    bulletCount =50;

    // 飞机ID数组
    arrayID =new Array();

    // 是否暂停
    isPause =false;
    
}

// 游戏基础模型
function BaseSource(){
    var sourceFolder ='images/';

    var localPic ={
        backGround:'bgPlan.png',
        bullet:'zidan.png',
        enemy:'diji.png',
        enemy_m:'enemy1.png',
        enemy_boss:'enemy2_n1.png',
        pause:'game_pause_nor.png',
        resume:'game_resume_nor.png',
        enemy_bullet:'bullet2.png',
        plane:'plane1.png'
    }
    
    function getSourceWithKey(name){
        return sourceFolder + localPic[name];
    }
}


// 初始化主机
function initPlane(){
    // 初始化主机
}

// 初始化敌人
function initEnemy(){
    //初始化敌机
    arrayEnemy =new Array();
}

function initBullet(){
    //初始化子弹
    arrayBullet =new Array();
}

function initMenu(){
    //初始化菜单
    var pause =document.createElement('div');

    pause.id ='pause_button';

    pause.style.top ='20px';
    pause.style.left =750-65+'px';
    screen.appendChild(pause);

    pause.onclick =function(){

        isPause =!isPause;

        pause.style.backgroundImage =isPause? "url('images/game_resume_nor.png')": "url('images/game_pause_nor.png')";

        isPause?clearTimer():setTimer();
    }
}

function initBackGround(){
    backGround1 =document.createElement('div');

    backGround1.className='background';
    backGround1.style.top='0px';
    backGround1.style.left='0px';


    screen.appendChild(backGround1);

    backGround2 =document.createElement('div');

    backGround2.className='background';
    backGround2.style.top=-document.documentElement.clientHeight;
    backGround2.style.left='0px';
    screen.appendChild(backGround2);
}

function createAll(){

}

function createPlane(){
     minePlane={};
    var planeDiv =document.createElement('div');
    minePlane.div =planeDiv;
    minePlane.div.id ='plane';
    minePlane.className='plane';

    // plane.style.left ='200px';
    // plane.style.top ='200px';
    minePlane.div.style.left=(750-90)/2+'px';
    minePlane.div.style.top =800-95 +'px';

    minePlane.pics =['images/plane1.png','images/plane2.png'];
    

    

    screen.appendChild(minePlane.div);
    var drag = planeDiv;

                //点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
                drag.onmousedown = function(e) {
                    var e = e || window.event; //兼容ie浏览器
                    var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
                    var diffY = e.clientY - drag.offsetTop;

                    /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
                     解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
                     可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
                     限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/
                    if(typeof drag.setCapture!='undefined'){
                        drag.setCapture();
                    }
                    document.onmousemove = function(e) {
                        var e = e || window.event; //兼容ie浏览器
                        var left=e.clientX-diffX;
                        var top=e.clientY-diffY;

                        //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                        if(left<0){
                            //left=0;
                        }else if(left >window.innerWidth-drag.offsetWidth){
                            left = window.innerWidth-drag.offsetWidth;
                            //left = window.innerWidth;
                        }
                        if(top<0){
                            //top=0;
                        }else if(top >window.innerHeight-drag.offsetHeight){
                            top = window.innerHeight-drag.offsetHeight;
                            //top = window.innerHeight;
                        }

                        //移动时重新得到物体的距离，解决拖动时出现晃动的现象
                        drag.style.left = left+ 'px';
                        drag.style.top = top + 'px';
                    };
                    document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动
                        this.onmousemove = null;
                        this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

                        //修复低版本ie bug
                        if(typeof drag.releaseCapture!='undefined'){
                            drag.releaseCapture();
                        }
                    };
                };

                myplane();
}

// 添加敌人

function createEnemy(){
    
    for (let index = 0; index < enemyCount; index++) {
        var enemy =new EnemyPlane(index,0);

        enemy.create();
    }

}

// 敌机模型类

function EnemyPlane(name,type){

    
    // 每架飞机的id

    var localType =['enemy','enemy_m','enemy_boss'];
    var eclassName=localType[type];


    this.id ='enemy'+eclassName+name;
    this.num =name;
    this.modelType =type;
    var bool =vaildateID(this.id);
    if(!bool)return -1;
    // 如果敌机已存在 则返回-1;

    this.pointX =0;
    this.pointY =0;
    // 坐标

    
    

    this.type =0;
    //0为未显示已收回,1为正在游戏中,2为动画中.



    this.create =function (){
        
        this.div= document.createElement('div');
        // console.log(enemy);
        // console.log(1);

        this.div.className =eclassName;
        this.div.id =this.id;

        arrayEnemy.push(this);
        arrayID.push(this.id);

    }

    this.reset =function (){

        var left =Math.floor(Math.random()*(750-120));
        this.div.style.left = left +'px' ;

        var top =Math.floor(Math.random()*(document.documentElement.clientHeight+100));
        this.div.style.top ='-'+ top+'px' ;
        this.type=1;
        this.changeType(this.modelType);
        
    }

    this.changeType =function(type){
        var localType =['enemy','enemy_m','enemy_boss'];
        var eclassName=localType[type];
        this.div.className =eclassName;
        this.modelType =type;
        
        switch (type) {
            case 0:
              {
                this.div.style.width='45px';
                this.div.style.height='30px';
                this.div.style.backgroundImage = "url('images/diji.png')";
              }  
                break;
                case 1:
                {
                    this.div.style.width='85px';
                this.div.style.height='98px';
                this.div.style.backgroundImage = "url('images/enemy1.png')";

                }
                break;
                case 2:
                {
                    this.div.style.width='120px';
                this.div.style.height='200px';
                this.div.style.backgroundImage = "url('images/enemy2_n1.png')";

                }
                break;
        
            default:
                break;
        }
    }


    this.boom =function(){
        
        this.type =0;
        this.reset();
    }

    this.pics =function (){

        switch (this.modelType) {
            case 0:
                {
                    return ['images/bz1.png','images/bz2.png','images/bz3.png','images/bz4.png','images/bz5.png']
                }
                break;
                case 1:
                {
                    return ['images/enemy1_down1.png','images/enemy1_down2.png','images/enemy1_down3.png','images/enemy1_down4.png']
                }
                break;
                case 2:
                {
                    return ['images/enemy2_down1.png','images/enemy2_down2.png','images/enemy2_down3.png','images/enemy2_down4.png','images/enemy2_down5.png','images/enemy2_down6.png']
                }
                break;
        
            default:
                break;
        }
    }

   
}


function createBullet(){
   for (let index = 0; index < bulletCount; index++) {
    var bullet = document.createElement('div');
    bullet.className='plane_bullet';
    
   
    var bulletID ='bulletID'+index;
    var bullet1 =new MyBullet(bulletID,0,bullet);

    arrayBullet.push(bullet1);

       
   }
}

function MyBullet(id,type,div){
    this.id =id;
    this.type =type;
    this.div =div ;

    this.reset =function(){
        // screen.removeChild(this.div);
        this.type=0;
        this.div.style.left ='-50px';
        this.div.style.top ='-50px';

    }
}

function setBullet(){
    for (let index = 0; index < arrayBullet.length; index++) {
     const bullet = arrayBullet[index];

        if(bullet.type==1)continue;

    var plane =document.getElementById('plane');
    var planeX = plane.style.left;
    var planeY =  plane.style.top;

    bullet.div.style.left =parseInt(planeX)+35+'px';
    bullet.div.style.top =parseInt(planeY)-30+'px';
    bullet.type=1;
    screen.appendChild(bullet.div);
    break;
    }
}

function upBullet(){
    for (let index = 0; index < arrayBullet.length; index++) {
        const bullet = arrayBullet[index];
        
        if(parseFloat(bullet.div.style.top)<-50){
            bullet.reset();
        }

        if(bullet.type==1){
            var topY = parseFloat(bullet.div.style.top);
                    topY-=1.5;
                    bullet.div.style.top =topY + 'px';
        }
       
    }
}


function vaildateID(name){
   for (let index = 0; index < arrayID.length; index++) {
       const tmpID = arrayID[index];

     if(tmpID ==name){
        return false;
     }
     
   }
   return true;
}









function frameContect(box0,box1){

    var x0 = parseInt(box0.style.left);
    var y0 = parseInt(box0.style.top);
    var width0 = parseInt(box0.clientWidth);
    var height0 = parseInt(box0.clientHeight);

    var x1 = parseInt(box1.style.left);
    var y1 = parseInt(box1.style.top);
    var width1 = parseInt(box1.clientWidth);
    var height1 = parseInt(box1.clientHeight);
    
    //第一个盒子左上角（x0,y0)在第二个盒子里
    if(x0 >= x1 && x0 <=x1+width1 && y0 >=y1 && y0 <=y1+height1)
    {
        return true;//碰上了
    }
    //第一个盒子右上角(x0+width0,y0)在第二个盒子里
    else if(x0+width0 >= x1 && x0+width0 <=x1+width1 && y0 >=y1 && y0 <=y1+height1)
    {
        return true;//碰上了
    }
    //第一个盒子左下角(x0,y0+height0)在第二个盒子里
    else if(x0 >= x1 && x0 <=x1+width1 && y0+height0 >=y1 && y0+height0 <=y1+height1)
    {
        return true;//碰上了
    }
    //第一个盒子右下角(x0+width0,y0+height0)在第二个盒子里
    else if(x0+width0 >= x1+width0 && x0 <=x1+width1 && y0+height0 >=y1 && y0+height0 <=y1+height1)
    {
        return true;//碰上了
    }
    return false;
}

//判断子弹
function judgeBullet(){


    for (const key in arrayEnemy) {
        if (arrayEnemy.hasOwnProperty(key)) {
            const enemyP = arrayEnemy[key];
            if(enemyP.type!=1)continue;
            
            for (const key2 in arrayBullet) {
                if (arrayBullet.hasOwnProperty(key2)) {
                    const bullet = arrayBullet[key2];
                    
                    if(bullet.type!=1)continue;
                    if(frameContect(enemyP.div,bullet.div)||frameContect(bullet.div,enemyP.div)){
                        enemyP.type=2;
                        // enemyP.reset();
                        bullet.reset();
                        frameAnimation(enemyP,enemyP.pics());
                    }




                }
            }


            
        }
    }

}

//设置飞机

function setEnemyPlane(){
    for (let index = 0; index < arrayEnemy.length; index++) {
        // const enemy = arrayEnemy[index];


        if (currentPlaneCount==maxPlaneCount){
            break;
        }
        var enemy =arrayEnemy[index];

        if(enemy.type==1)continue;

        if (currentPlaneCount%12 ==0){
            setEnemy_m();   
        }else if (currentPlaneCount%16 ==0){
            setEnemy_Boss();
        }else{
            enemy.changeType(0);
        }

        
        enemy.reset();
        screen.appendChild(enemy.div);
        currentPlaneCount +=1;

    }

    function setEnemy_m(){
        enemy.changeType(1);
    }

    function setEnemy_Boss(){
        enemy.changeType(2);
    }
}


function frameAnimation(enemyL,pics){

    var index=0;

    

    function run(){
        var url =pics[index];
        if(index >= pics.length){
            enemyL.reset();
            return;
        }

        enemyL.div.style.backgroundImage = 'url(' + url + ')';
        enemyL.div.style.backgroundRepeat = 'no-repeat'; 

        index++;
        oTimer =setTimeout(run,160);        
    }

    run();

}



// 敌机下落

function enemyDown(){

  

    for (let index = 0; index < arrayEnemy.length; index++) {

        var enemy =arrayEnemy[index];
        if(enemy.type!=1){continue;}
        var topY = parseFloat(enemy.div.style.top);
        
        switch (enemy.modelType) {
            case 0:
                {
                    topY+=1+enemy.num*0.1;
                }
                break;
                case 1:
                {
                    topY+=4;
                }
                break;
                case 2:
                {
                    topY+=6;   
                }
                break;
        
            default:
                break;
        }

        enemy.div.style.top =topY + 'px';

    }
}

//回收飞机

function judgePlane(){
    for (let index = 0; index < arrayEnemy.length; index++) {

        var enemy =arrayEnemy[index];


        if(parseInt(enemy.div.style.top)>document.documentElement.clientHeight){
            // screen.removeChild(enemy.div);
            enemy.type=0;
            enemy.reset();
        }

    }

    
}


// 子弹上升

// 背景移动

function moveBackGround(){

    var topY = parseFloat(backGround1.style.top);
        topY+=0.9;
        backGround1.style.top =topY + 'px';

        if(parseInt(backGround1.style.top)>document.documentElement.clientHeight){
            backGround1.style.top=-document.documentElement.clientHeight;
        }

        var topY = parseFloat(backGround2.style.top);
        topY+=0.9;
        backGround2.style.top =topY + 'px';

        if(parseInt(backGround2.style.top)>document.documentElement.clientHeight){
            backGround2.style.top=-document.documentElement.clientHeight;
        }

}



function initGame(){

    initConfig();
    // 得分,数据初始化

    initBackGround();

    initMenu();

    initEnemy();

    createEnemy();

    createPlane();

    initBullet();

    createBullet();

    setTimer();
}

function setTimer(){

    var timerSetEnemy =setInterval(setEnemyPlane,1000);

  var timerEnemy = setInterval(enemyDown,20);   

  var timerReciveEnemy = setInterval(judgePlane,10);

  var timerBullet = setInterval(setBullet ,350);

  var timerUpBullet = setInterval(upBullet,1);

  var timerJudgeBullet = setInterval(judgeBullet,0.1);

   var timerBack = setInterval(moveBackGround,1);



    timerArray =[timerEnemy,timerReciveEnemy,timerJudgeBullet,timerUpBullet,timerBack];

}

function myplane(){

     var index =0;
    function run(){
        index =index==1?0:1;
        console.log(index);
        var url =minePlane.pics[index];
       
        minePlane.div.style.backgroundImage = 'url(' + url + ')';
        minePlane.div.style.backgroundRepeat = 'no-repeat'; 

        oTimer =setTimeout(run,160);     
        
    }

    run();
}

function clearTimer(){
    for (let index = 0; index < timerArray.length; index++) {
        const element = timerArray[index];
        clearInterval(element);
    }
}




window.onload = initGame();