$(function(){
	var imgs=$("a",$(".box")[0]);
	var lis=$('li',$('ul')[0]);
	var win=$('.window')[0];
	var btnR=$('.btnR')[0];
	var btnL=$('.btnL')[0];
	var widths=parseInt(getStyle(win,'width'));

	var flag=true;
	// 定义下标
	var index=0;
	var next=0;

	// 初始化状态
	lis[0].style.background='red';
	for(var i=0;i<imgs.length;i++)
	{
		if(i==0)
		{
			continue;
		}
		imgs[i].style.left=widths+'px';
	}
	var t=setInterval(moveR,1000);

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
		lis[next].style.background='red';
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
		lis[next].style.background='red';
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
				lis[this.index].style.background='red';
				//动画
				animate(imgs[index],{left:-widths});
				animate(imgs[this.index],{left:0},function(){flag=true});

				next=this.index;
				index=this.index;
			}else if(index>this.index){
				imgs[this.index].style.left=-widths+'px';
				lis[index].style.background='#ccc';
				lis[this.index].style.background='red';
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


})