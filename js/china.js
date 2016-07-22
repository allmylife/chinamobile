$(function(){

	//选项卡效果
	var item=document.getElementsByClassName('item');
	var list=document.getElementsByClassName('list');
	for(var i in item)
	{
		item[i].index=i;
		item[i].onmouseover=function(){
			list[this.index].style.display='block';
		}
		item[i].onmouseout=function(){
			list[this.index].style.display='none';
		}
	}

	//图片轮播效果
	var imgs=$("a",$(".banner")[0]);
	var lis=$('li',$('.dian')[0]);
	var win=$('.banner')[0];
	var btnR=$('.btnR')[0];
	var btnL=$('.btnL')[0];
	var widths=parseInt(getStyle(win,'width'));

	var flag=true;
	// 定义下标
	var index=0;
	var next=0;

	// 初始化状态
	lis[0].style.background='#E7258A';
	for(var i=0;i<imgs.length;i++)
	{
		if(i==0)
		{
			continue;
		}
		imgs[i].style.left=widths+'px';
	}
	var t=setInterval(moveR,3000);

	win.onmouseover=function(){
		clearInterval(t);
	}
	win.onmouseout=function(){
		t=setInterval(moveR,1000);
	}
	function moveR(){
		//刚进来就让next加到1
		next++;
		if(next==imgs.length)
		{
			next=0;
		}
		//下一张就位
		imgs[next].style.left=widths+'px';
		//动画效果
		lis[index].style.background='#ccc';
		animate(imgs[index],{left:-widths},function(){flag=true});
		animate(imgs[next],{left:0},function(){flag=true});
		lis[next].style.background='#E7258A';
		//更新下标
		index=next;
	}

	function moveL(){
		//刚进来就让next加到1
		next--;
		if(next<0)
		{
			next=imgs.length-1;
		}
		//下一张就位
		imgs[next].style.left=-widths+'px';
		//动画效果
		lis[index].style.background='#ccc';
		animate(imgs[index],{left:widths},function(){flag=true});
		animate(imgs[next],{left:0},function(){flag=true});
		lis[next].style.background='#E7258A';
		//更新下标
		index=next;
	}
	for(var i=0;i<imgs.length;i++)
	{
		lis[i].index=i;
		lis[i].onclick=function(){
			if(index==this.index)
			{
				return ;
			}
			if(index<this.index)
			{
				//就位
				imgs[this.index].style.left=widths+'px';
				lis[index].style.background='#ccc';
				lis[this.index].style.background='#E7258A';
				//动画
				animate(imgs[index],{left:-widths});
				animate(imgs[this.index],{left:0},function(){flag=true});

				next=this.index;
				index=this.index;
			}else if(index>this.index){
				//就位
				imgs[this.index].style.left=-widths+'px';
				lis[index].style.background='#ccc';
				lis[this.index].style.background='#E7258A';
				//动画
				animate(imgs[index],{left:widths});
				animate(imgs[this.index],{left:0},function(){flag=true});

				next=this.index;
				index=this.index;
			}
			
		}
	}
	btnR.onclick=function(){
		if(flag)
		{
			moveR();
			flag=false;
		}
	}
	btnL.onclick=function(){
		if(flag)
		{
			moveL();
			flag=false;
		}
	}


	//四张图片轮播起来
	var win=$('.xuanchuan')[0];
	console.log(win)


	nodeScroll(win,1)
	function nodeScroll(obj,num){
	var box=$('.hezi',obj)[0];
	var btn=$('.btn',obj)[0];
	var btnL=$('.btnL',obj)[0];
	var btnR=$('.btnR',obj)[0];
	console.log(btnR)
	var imgs=$('.right',obj);
	var widths=287;
	var flag4=true;
	 //console.log(btnR);

	var t=setInterval(moveL,5000);

	win.onmouseover=function(){
		clearInterval(t);
	}
	win.onmouseout=function(){
		t=setInterval(moveL,5000);
	}
	btnL.onclick=function(){
		if(flag4)
		{
			flag4=false;
			moveL();
		}
	}
	btnR.onclick=function(){
		if(flag4)
		{
			flag4=false;
			moveR();
		}
	}
	function moveL(){
		for(var i=0;i<num;i++)
		{
			var first=firstChild(box);
			var last=lastChild(box);
			insertBefore(last,first);
			box.style.left=-widths+'px';
		}
		
		
		animate(box,{left:0},function(){flag4=true;});
	}

	function moveR(){
		animate(box,{left:-widths},function(){
			for(var i=0;i<num;i++)
			{
				var first=firstChild(box);
				appendChild(first,box);
				box.style.left=0;
			}
			
			
			flag4=true;
		})
	}
	}
})