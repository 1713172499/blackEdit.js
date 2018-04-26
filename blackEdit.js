/*
 * @author black
 * @email 1713172499@qq.com
 * @site http://www.hedujin.com
 * @gibhub https://github.com/1713172499
 * @date 2018-4-24
 * 
 * 
 * 
 * 
 *	实例参数
 * 	@param string textarea的ID
 * 	@param object data参数
 */

/*
 *	data 示例参数如下
 * 	{
 * 		width : string, // 编辑器宽度 如：500px
 * 		height : string, // 编辑器高度 如：300px
 * 		faceSrc : string, // 表情图片的路径 如：./face/
 * 		imgUpload : url, // 图片上传处理程序地址
 * 		audioUpload : url, // 音频上传处理程序地址
 * 		videoUpload : url, // 视频上传处理程序地址
 * 		resize : boolean, // 是否允许编辑器可调整高度：IE下不支持
 * 		prompt : boolean | string, // 编辑器提示:false为不显示提示
 * 		tools : [
			'bold', // 加粗
			'italic', // 斜体
			'underline', // 下划线
			'strike', // 删除线
			'fontsize', // 字体大小
			'fontcolor', // 字体颜色
			'hiliteColor', // 字体背景色
			'removeformat', // 清空格式
			'quote-left', // 左引用
			'quote-right', // 右引用
			'align-left', // 左对齐
			'align-center', // 居中对齐
			'align-right', // 右对齐
			'list-numbered', // 有序列表
			'list-bullet', // 无需列表
			'indent-right', // 增加缩进
			'indent-left', // 减少缩进
			'inserthorizontalrule', // 水平线
			'link', // 插入超链接
			'unlink', // 清空超链接
			'undo', // 后退一步
			'redo', // 前进一步
			'fullscreen', // 编辑器全屏
			'picture', // 插入图片
			'face', // 插入表情
			'paragraph', // 插入新段落
			'movie', // 插入视频
			'music', // 插入音乐
			'html', // 编辑HTML代码
			'|' // 工具分割线
		]
 * 	}
 */
/////////////////////////////////////////////////////////////////////////////////////////////
blackEdit = function(textareaDom,data={}){
	var _this = this;
	window.blackEditIndex = (window.blackEditIndex ? window.blackEditIndex : 0);  // 记录编辑器的索引
	window.blackEditIndex++;
	this.id = 'blackEdit-box-'+window.blackEditIndex;
	this.textareaDom = $('#'+textareaDom); // textarea
	this.parentDom = $('#'+textareaDom).parent(); // textarea的父元素，用户追加编辑器
	this.editWidth = data.width ? data.width : '100%'; // 编辑器的宽度
	this.editHeight = data.height ? data.height : '300px'; // 编辑器的宽度
	this.imgUpload = data.imgUpload ? data.imgUpload : undefined; // 图片上传地址
	this.videoUpload = data.videoUpload ? data.videoUpload : undefined; // 视频上传地址
	this.audioUpload = data.audioUpload ? data.audioUpload : undefined; // 音频上传地址
	this.editResize = data.resize ? data.resize : false; // 允许编辑器高度缩放：IE下不支持
	if(typeof data.prompt == 'string'){
		this.promptText = data.prompt; // 提示	
	}else if(typeof data.prompt == 'boolean' && data.prompt == false){
		this.promptText = ''; // 提示	
	}else{
		this.promptText = data.prompt ? data.prompt : '欢迎使用 blackEdit.js'; // 提示
	}
	// 表情标题
	var face_t = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"];
	// 定义表情工具
	this.face_src = data.faceSrc ? data.faceSrc : './face/'; // 表情相对路径
	this.face = $('<span><a class="iconfont icon-icon-bianjiqicaozuo-7" data-tool="face" title="插入表情"></a><div class="face-box"></div></span>');
	// 插入表情
	for(var i = 0;i<face_t.length;i++){
		this.face.find('.face-box').append('<img src="'+this.face_src+i+'.gif" title="'+face_t[i]+'" data-src="'+i+'"/>');
	}
	this.defaultTools = [
		'bold',
		'italic',
		'underline',
		'strike',
		'fontsize',
		'fontcolor',
		'hiliteColor',
		'|',
		'removeformat',
		'quote-left',
		'quote-right',
		'align-left',
		'align-center',
		'align-right',
		'|',
		'list-numbered',
		'list-bullet',
		'indent-right',
		'indent-left',
		'inserthorizontalrule',
		'|',
		'link',
		'unlink',
		'undo',
		'redo',
		'fullscreen',
		'|',
		'picture',
		'face',
		'paragraph',
		'movie',
		'music',
		'html'
	];	// 默认工具箱
	this.defaultToolsDom = {
		'bold' : $('<span><a class="iconfont icon-bold" data-tool="bold" title="加粗"></a></span>'),
		'italic' : $('<span><a class="iconfont icon-italic" data-tool="italic" title="斜体"></a></span>'),
		'underline' : $('<span><a class="iconfont icon-underline" data-tool="underline" title="下划线"></a></span>'),
		'strike' : $('<span><a class="iconfont icon-strikethrough" data-tool="strike" title="删除线"></a></span>'),
		'fontsize' : $('<span><a class="iconfont icon-728bianjiqi_zitidaxiao" data-tool="fontsize" title="字体大小"></a><div class="fontsize-box"><div data-fontsize="1" style="font-size:9px">size 1</div><div data-fontsize="2" style="font-size:10px">size 2</div><div data-fontsize="3" style="font-size:12px">size 3</div><div data-fontsize="4" style="font-size:14px">size 4</div><div data-fontsize="5" style="font-size:16px">size 5</div><div data-fontsize="6" style="font-size:18px">size 6</div><div data-fontsize="7" style="font-size:24px">size 7</div></div></span>'),
		'fontcolor' : $('<span><a class="iconfont icon-zitiyanse" data-tool="fontcolor" title="字体颜色"></a><div class="insertFontColor"><div class="fontColorRow"><span data-color="#E53333"><div style="background-color: rgb(229, 51, 51);"></div></span><span data-color="#E56600"><div style="background-color: rgb(229, 102, 0);"></div></span><span data-color="#FF9900"><div style="background-color: rgb(255, 153, 0);"></div></span><span data-color="#64451D"><div style="background-color: rgb(100, 69, 29);"></div></span><span data-color="#DFC5A4"><div style="background-color: rgb(223, 197, 164);"></div></span><span data-color="#FFE500"><div style="background-color: rgb(255, 229, 0);"></div></span></div><div class="fontColorRow"><span data-color="#009900"><div style="background-color: rgb(0, 153, 0);"></div></span><span data-color="#006600"><div style="background-color: rgb(0, 102, 0);"></div></span><span data-color="#99BB00"><div style="background-color: rgb(153, 187, 0);"></div></span><span data-color="#B8D100"><div style="background-color: rgb(184, 209, 0);"></div></span><span data-color="#60D978"><div style="background-color: rgb(96, 217, 120);"></div></span><span data-color="#00D5FF"><div style="background-color: rgb(0, 213, 255);"></div></span></div><div class="fontColorRow"><span data-color="#337FE5"><div style="background-color: rgb(51, 127, 229);"></div></span><span data-color="#003399"><div style="background-color: rgb(0, 51, 153);"></div></span><span data-color="#4C33E5"><div style="background-color: rgb(76, 51, 229);"></div></span><span data-color="#9933E5"><div style="background-color: rgb(153, 51, 229);"></div></span><span data-color="#CC33E5"><div style="background-color: rgb(204, 51, 229);"></div></span><span data-color="#EE33EE"><div style="background-color: rgb(238, 51, 238);"></div></span></div><div class="fontColorRow"><span data-color="#FFFFFF"><div style="background-color: rgb(255, 255, 255);"></div></span><span data-color="#CCCCCC"><div style="background-color: rgb(204, 204, 204);"></div></span><span data-color="#999999"><div style="background-color: rgb(153, 153, 153);"></div></span><span data-color="#666666"><div style="background-color: rgb(102, 102, 102);"></div></span><span data-color="#333333"><div style="background-color: rgb(51, 51, 51);"></div></span><span data-color="#000000"><div style="background-color: rgb(0, 0, 0);"></div></span></div><span>关闭</san></div></span>'),
		'hiliteColor' : $('<span><a class="iconfont icon-beijingyanse" data-tool="hiliteColor" title="文字背景颜色"></a><div class="insertFontColor"><div class="fontColorRow"><span data-color="#E53333"><div style="background-color: rgb(229, 51, 51);"></div></span><span data-color="#E56600"><div style="background-color: rgb(229, 102, 0);"></div></span><span data-color="#FF9900"><div style="background-color: rgb(255, 153, 0);"></div></span><span data-color="#64451D"><div style="background-color: rgb(100, 69, 29);"></div></span><span data-color="#DFC5A4"><div style="background-color: rgb(223, 197, 164);"></div></span><span data-color="#FFE500"><div style="background-color: rgb(255, 229, 0);"></div></span></div><div class="fontColorRow"><span data-color="#009900"><div style="background-color: rgb(0, 153, 0);"></div></span><span data-color="#006600"><div style="background-color: rgb(0, 102, 0);"></div></span><span data-color="#99BB00"><div style="background-color: rgb(153, 187, 0);"></div></span><span data-color="#B8D100"><div style="background-color: rgb(184, 209, 0);"></div></span><span data-color="#60D978"><div style="background-color: rgb(96, 217, 120);"></div></span><span data-color="#00D5FF"><div style="background-color: rgb(0, 213, 255);"></div></span></div><div class="fontColorRow"><span data-color="#337FE5"><div style="background-color: rgb(51, 127, 229);"></div></span><span data-color="#003399"><div style="background-color: rgb(0, 51, 153);"></div></span><span data-color="#4C33E5"><div style="background-color: rgb(76, 51, 229);"></div></span><span data-color="#9933E5"><div style="background-color: rgb(153, 51, 229);"></div></span><span data-color="#CC33E5"><div style="background-color: rgb(204, 51, 229);"></div></span><span data-color="#EE33EE"><div style="background-color: rgb(238, 51, 238);"></div></span></div><div class="fontColorRow"><span data-color="#FFFFFF"><div style="background-color: rgb(255, 255, 255);"></div></span><span data-color="#CCCCCC"><div style="background-color: rgb(204, 204, 204);"></div></span><span data-color="#999999"><div style="background-color: rgb(153, 153, 153);"></div></span><span data-color="#666666"><div style="background-color: rgb(102, 102, 102);"></div></span><span data-color="#333333"><div style="background-color: rgb(51, 51, 51);"></div></span><span data-color="#000000"><div style="background-color: rgb(0, 0, 0);"></div></span></div><span>关闭</san></div></span>'),
		'removeformat' : $('<span><a class="iconfont icon-qingchuhuancun" data-tool="removeformat" title="清除格式"></a></span>'),
		'quote-left' : $('<span><a class="iconfont icon-baojiaquotation2" data-tool="quote-left" title="左引用"></a></span>'),
		'quote-right' : $('<span><a class="iconfont icon-baojiaquotation" data-tool="quote-right" title="右引用"></a></span>'),
		'align-left' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-2" data-tool="align-left" title="左对齐"></a></span>'),
		'align-center' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-1" data-tool="align-center" title="居中"></a></span>'),
		'align-right' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-" data-tool="align-right" title="右对齐"></a></span>'),
		'list-numbered' : $('<span><a class="iconfont icon-youxuliebiao" data-tool="list-numbered" title="有序列表"></a></span>'),
		'list-bullet' : $('<span><a class="iconfont icon-liebiaowuxu" data-tool="list-bullet" title="无序列表"></a></span>'),
		'indent-right' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-3" data-tool="indent-right" title="增加缩进"></a></span>'),
		'indent-left' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-4" data-tool="indent-left" title="减少缩进"></a></span>'),
		'inserthorizontalrule' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-6" data-tool="inserthorizontalrule" title="水平线"></a></span>'),
		'link' : $('<span><a class="iconfont icon-link" data-tool="link" title="超级链接"></a><div class="addUrl-box"><input type="text" class="blackEdit-url" placeholder="http:// | https://" /><input type="text" class="blackEdit-urltext" placeholder="链接文字" /><select name=""><option value="new">新窗口</option><option value="self">当前窗口</option></select><a href="javascript:;" class="affirm-btn">确认</a><a href="javascript:;" class="exit-btn">取消</a></div></span>'),
		'unlink' : $('<span><a class="iconfont icon-remove_link" data-tool="unlink" title="取消超级链接"></a></span>'),
		'undo' : $('<span><a class="iconfont icon-chexiao" data-tool="undo" title="后退一步"></a></span>'),
		'redo' : $('<span><a class="iconfont icon-zhongzuo" data-tool="redo" title="前进一步"></a></span>'),
		'fullscreen' : $('<span><a class="icon-fullscreen" data-tool="fullscreen" title="全屏显示"></a></span>'),
		'picture' : $('<span><a class="iconfont icon-bianjiqicharutupian" data-tool="picture" title="插入图片"></a><div class="upload-img-box">网络图片:<input type="text" placeholder="请输入图片链接"/><a href="javascript:;" class="website-upload">确认</a>本地上传：<div class="location-upload iconfont icon-shangchuan"><input type="file" class="upload-img" accept="image/*"/></div></div></span>'),
		'face' : this.face,
		'paragraph' : $('<span><a class="iconfont icon-charuxing" data-tool="paragraph" title="插入新段落"></a></span>'),
		'movie' : $('<span><a class="iconfont icon-shipinwenjian" data-tool="movie" title="插入视频"></a><div class="upload-video-box">网络视频:<input type="text" placeholder="请输入视频链接"/><a href="javascript:;" class="video-url-upload">确认</a>本地上传：<div class="video-location-upload iconfont icon-shangchuan"><input type="file" class="upload-video" accept="video/*"/></div></div></span>'),
		'music' : $('<span><a class="iconfont icon-tubiaozhizuomoban" data-tool="music" title="插入音频"></a><div class="upload-audio-box">网络音频:<input type="text" placeholder="请输入音频链接"/><a href="javascript:;" class="audio-url-upload">确认</a>本地上传：<div class="audio-location-upload iconfont icon-shangchuan"><input type="file" class="upload-audio" accept="audio/*"/></div></div></span>'),
		'html' : $('<span><a class="iconfont icon-icon-bianjiqicaozuo-5" data-tool="html" title="编辑HTML代码"></a></span>')
	}; // 储存默认工具箱的元素
	// 是否传入工具箱
	if(typeof data.tools != 'object') {
		this.tools = this.defaultTools;
	}else{
		this.tools = data.tools;
	}
	/* 一个值是否在一个数组里的函数  */
	this.inArray = function(needle, haystack) {
		type = typeof needle
		 if(type == 'string' || type =='number') {
		  for(var i in haystack) {
		   if(haystack[i] == needle) {
		     return true;
		   }
		  }
		 }
		 return false;
	}
	/**
	 * 	初始化DOM编辑器结构
	 */
	/* 初始化textare样式 */
	this.textareaDom.css({
		'width' : '100%',
		'height' : 'calc(100% - 10px)',
		'border' : 'none',
		'display' : 'none',
		'font-family' : 'Menlo, Consolas, DejaVu Sans Mono, monospace',
		'color' : '#ccc',
		'background-color' : '#282c34',
		'font-size' : '14px',
		'border-radius' : '5px',
		'padding' : '5px'
	});
	/* 编辑器外层框架 */ 
	this.blackEditDom = $('<div id="blackEdit-box-'+window.blackEditIndex+'"></div>');
	this.blackEditDom[0].style.width = this.editWidth;
	/* 工具栏菜单 */
	this.blackEditToolBar = $('<div class="blackEdit-toolbar"></div>');
	/* 将数组里的工具选项追加进工具栏菜单 */
	for(var tool in this.tools){
		if( this.inArray( this.tools[tool], this.defaultTools ) )
		{
			if(this.tools[tool] == '|'){
				this.blackEditToolBar.append('<span class="gap"></span>');
			}else{
				this.blackEditToolBar.append(this.defaultToolsDom[this.tools[tool]]);
			}
		}
	}
	/* 将工具栏菜单追加到编辑器  */
	this.blackEditDom.append(this.blackEditToolBar);
	
	/* 编辑区域外层框架 */
	this.blackEditBody = $('<div class="blackEdit-body"></div>');
	this.blackEditBody[0].style.height = this.editHeight;
	this.blackEditBody[0].style.width = this.editWidth;
	if(this.editResize){
		this.blackEditBody[0].style.overflow = 'auto';
		this.blackEditBody[0].style.resize = 'vertical';
	}
	/* iframe */
	this.myframe = document.createElement('iframe');
	this.myframe.style.width = '100%';
	this.myframe.style.height = 'calc(100% - 10px)';
	/* 当iframe加载完成 */
	$(this.myframe).on('load',function(){
		// 获取iframe的document
		_this.f = this.contentDocument;
		/* 开启iframe设计模式 */
		this.contentDocument.designMode = 'on';
		_this.f.execCommand('insertHTML',false,'<p>'+_this.promptText+'</p>');
	});
	/* 将iframe和textare追加进编辑区域外层 */
	this.blackEditBody.append(this.myframe);
	this.blackEditBody.append(this.textareaDom);
	
	/* 将编辑区追加进编辑器外层 */
	this.blackEditDom.append(this.blackEditBody);
	
	/* 编辑器追加到textare的父级元素下  */
	this.parentDom.append(this.blackEditDom);
	
	// 添加事件
	this.blackEditDom.find('.blackEdit-toolbar span a').on('click',function(){
		var t = $(this);
		var toolType = t.data('tool');
		switch(toolType){
			// 加粗
			case "bold":
	        	_this.f.execCommand('bold',false,null);
	        break;
	        // 斜体
		    case "italic":
		        _this.f.execCommand('italic',false,null);
		        break;
	        // 下划线
		    case "underline":
		        _this.f.execCommand('underline',false,null);
		        break;
		    // 删除线
		    case "strike":
		        _this.f.execCommand('strikethrough',false,null);
		        break;
	        // 改变文字大小
			case "fontsize":
				if(t.next()[0].style.display == 'block'){
				  	t.next().hide(200);
				  	t.parent().removeClass('tool-checked');
				  	t.next().find('>div').off('click');
				}else{
					// 选择框显示
				  	t.next().show(200);
				  	// 按钮添加选中状态
				  	t.parent().addClass('tool-checked');
				  	// 添加改变字体事件
				    t.next().find('>div').on('click',function(){
				      var size = $(this).data("fontsize");
				      _this.f.execCommand("fontSize",false,size);
				      $(this).off("click");
				      $(this).parent().hide(200);
				  	  t.parent().removeClass('tool-checked');
				    });
				}
			    break;
		    // 改变文字颜色
		    case "fontcolor":
		    	// 颜色选择框显示
		        t.next().show(200);
		        // 添加选中状态
			  	t.parent().addClass('tool-checked');
			  	// 添加更换字体颜色事件
		        t.next().find(".fontColorRow>span").on('click',function(){
		          var colorCode = $(this).data("color");
		          _this.f.execCommand("foreColor",false,colorCode);
		          $(this).parent().parent().hide(200);
			  	  t.parent().removeClass('tool-checked');
		        });
		        // 关闭选色框
		        t.next().find(">span").click(function(){
		          $(this).parent().hide(200);
			  	  t.parent().removeClass('tool-checked');
			  	  t.next().find(".fontColorRow>span").off('click');
		        })
		        break;
	        // 改变文字背景色
		    case "hiliteColor":
		    	// 颜色选择框显示
		        t.next().show(200);
		        // 添加选中状态
			  	t.parent().addClass('tool-checked');
			  	// 添加更换字体颜色事件
		        t.next().find(".fontColorRow>span").on('click',function(){
		          var colorCode = $(this).data("color");
		          _this.f.execCommand("hiliteColor",false,colorCode);
		          $(this).parent().parent().hide(200);
			  	  t.parent().removeClass('tool-checked');
		        });
		        // 关闭选色框
		        t.next().find(">span").on('click',function(){
		          $(this).parent().hide(200);
			  	  t.parent().removeClass('tool-checked');
			  	  t.next().find(".fontColorRow>span").off('click');
		        });
		        break;
	        // 清除格式
		    case "removeformat":
		        _this.f.execCommand("removeformat");
		        break;
	        // 左引用
		    case "quote-left":
		        _this.f.execCommand('insertHTML',false,"<blockquote style='border-left: 5px solid #00a3cf;background-color: #f6f6f6;margin: 0 0 20px;padding: 15px 20px;text-align:left;'></blockquote>");
		        break;
	        // 右引用
		    case "quote-right":
		        _this.f.execCommand('insertHTML',false,"<blockquote style='border-right: 5px solid #00a3cf;background-color: #f6f6f6;margin: 0 0 20px;padding: 15px 20px;text-align:right;'></blockquote>");
		        break;
	        // 左对齐
		 	case "align-left":
		  		_this.f.execCommand('justifyLeft',false,null);
		   	 	break;
	   	 	// 居中对齐
		    case "align-center":
		        _this.f.execCommand('justifyCenter',false,null);
		        break;
	        // 右对齐
		    case "align-right":
		        _this.f.execCommand('justifyRight',false,null);
		        break;
	        // 有序列表
		    case "list-numbered":
		        _this.f.execCommand('insertOrderedList',false,null);
		        break;
	        // 无需列表
			case "list-bullet":
			    _this.f.execCommand('insertUnorderedList',false,null);
			    break;
		    // 增加缩进
			case "indent-right":
	       		_this.f.execCommand('indent');
	        break;
	        // 减少缩进
	      	case "indent-left":
	        	_this.f.execCommand('outdent');
	       		break;
	   		// 水平线
	      	case "inserthorizontalrule":
	        	_this.f.execCommand("insertHorizontalRule",false,null);
	        	break;
	    	// 插入链接
	       	case "link":
	       		if(t.next()[0].style.display == 'block'){
	       			t.next().hide(200);
				  	t.parent().removeClass('tool-checked');
				  	t.next().find('.affirm-btn').off('click');
				  	t.next().find('.exit-btn').off('click');
	       		}else{
		       		t.next().show(200);
				  	t.parent().addClass('tool-checked');
				  	// 关闭窗口
				  	t.next().find('.exit-btn').on('click',function(){
				  		t.next().hide(200);
				  		t.parent().removeClass('tool-checked');
				  		t.next().find('.affirm-btn').off('click');
				  	});
				  	// 确认添加链接
				  	t.next().find('.affirm-btn').on('click',function(){
				  		var urls = t.next().find('.blackEdit-url').val();
				  		var urlTarget = t.next().find('select').val();
				  		var urlText = t.next().find('.blackEdit-urltext').val();
				  		if(urls.length == 0){
				  			alert('链接不能为空');
				  			return false;
				  		}
				  		_this.f.execCommand("insertHTML",false,"<a href='" + urls + "' target='"+urlTarget+"'>" + urlText + "</a>");
				  		t.next().hide(200);
				  		t.parent().removeClass('tool-checked');
				  		$(this).off('click');
				  	});
	       		}
	        	break;
	    	// 删除链接
	        case "unlink":
	            _this.f.execCommand('unLink');
	            break;
	        //  后退一步
	        case "undo":
				_this.f.execCommand("undo");
				break;
			// 前进一部
			case "redo":
				_this.f.execCommand("redo");
				break;
			// 编辑器全屏显示
			case "fullscreen":
				if(_this.blackEditDom.hasClass('blackEdit-fullscreen')){
	        		_this.blackEditDom.removeClass('blackEdit-fullscreen');
			  		t.parent().removeClass('tool-checked');
				}else{
					_this.blackEditDom.addClass('blackEdit-fullscreen');
			  		t.parent().addClass('tool-checked');
				}
	        break;
	        // 插入新段落
	        case "paragraph":
	        	appendBodyTag(_this.myframe,createTagNode('p','新的段落'));
	        	break;
	    	case "html":
		  		if(t.parent().hasClass('tool-checked')){
			  		t.parent().removeClass('tool-checked');
	    			_this.blackEditDom.find('textarea').hide();
	    			_this.blackEditDom.find('iframe').show();
	    			_this.blackEditDom.find('iframe').contents()[0].body.innerHTML=_this.blackEditDom.find('textarea').val();
				}else{
			  		t.parent().addClass('tool-checked');
	    			_this.blackEditDom.find('textarea').show();
					_this.blackEditDom.find('iframe').hide();
					_this.blackEditDom.find('textarea').val(_this.blackEditDom.find('iframe').contents()[0].body.innerHTML);
				}
	    		break;
    		// 插入表情
	    	case "face":
	    		if(t.next()[0].style.display == 'block'){
	    			t.next().hide(200);
			  		t.parent().removeClass('tool-checked');
			  		t.next().find('img').off('click');
	    		}else{
	    			t.next().show(200);
			  		t.parent().addClass('tool-checked');
			  		t.next().find('img').on('click',function(){
		    			_this.f.execCommand('insertHTML',false,'<img src="'+_this.face_src+$(this).data('src')+'.gif" width="22px"/>');
		    			t.next().find('img').off('click');
		    			t.next().hide(200);
				  		t.parent().removeClass('tool-checked');
	    			});
	    		}
	    		break;
    		// 插入图片
    		case "picture":
    			if(t.next()[0].style.display == 'block'){
	    			t.next().hide(200);
			  		t.parent().removeClass('tool-checked');
			  		t.next().find('input[type="file"]').off('change');
    				t.next().find('.website-upload').off('click');
    			}else{
	    			t.next().show(200);
			  		t.parent().addClass('tool-checked');
			  		// 插入图片以网络图片方式
	    			t.next().find('.website-upload').on('click',function(){
	    				if(t.next().find('input[type="text"]').val().length == 0){
	    					alert('请输入图片链接');
	    					return false;
	    				}
	    				_this.f.execCommand('insertHtml',false,'<img src="'+t.next().find('input[type="text"]').val()+'"/>');
	    				$(this).off('click');
			  			t.parent().removeClass('tool-checked');
	    				t.next().hide(200);
	    				t.next().find('input[type="file"]').off('change');
	    			});
	    			// 插入图片以本地上传方式
	    			t.next().find('input[type="file"]').on('change',function(){
	    				if(_this.imgUpload == undefined){
	    					alert('未指定图片上传处理地址');
	    					t.next().hide(200);
	    					$(this).off('change');
			  				t.parent().removeClass('tool-checked');
	    					t.next().find('.website-upload').off('click');
	    					return false;
	    				}
	    				var fileData = this.files[0];
	    				var formData = new FormData();
	    				formData.append('face',fileData);
	    				// $_FILES['face'] 接收图片信息
	    				$.ajax({
	    					url : _this.imgUpload,
	    					type : 'POST',
	    					data : formData,
	    					cache:false,         //不设置缓存
						    processData: false,  // 不处理数据
						    contentType: false,  // 不设置内容类型
	    					error:function(xhr) {
	    						alert('发生错误');
	    						console.log(xhr);
	    					},
	    					success:function(data){
	    						var data = JSON.parse(data);
	    						/* '{"msg":"msg","status":"status","url":"url"}' */
	    						if(data.status == 1){
	    							_this.f.execCommand('insertHtml',false,'<img src="'+data.url+'"/>');
	    						}else{
	    							alert(data.msg);	
	    						}
	    					}
	    				});
			  			t.parent().removeClass('tool-checked');
	    				t.next().hide(200);
	    				$(this).off('change');
	    				t.next().find('.website-upload').off('click');
	    			});
    			}
			break;
			// 插入音频
			case 'music':
				if(t.next()[0].style.display == 'block'){
	    			t.next().hide(200);
			  		t.parent().removeClass('tool-checked');
			  		t.next().find('input[type="file"]').off('change');
    				t.next().find('.audio-url-upload').off('click');
    			}else{
	    			t.next().show(200);
			  		t.parent().addClass('tool-checked');
			  		// 插入音频以url方式
	    			t.next().find('.audio-url-upload').on('click',function(){
	    				if(t.next().find('input[type="text"]').val().length == 0){
	    					alert('请输入音频链接');
	    					return false;
	    				}
	    				_this.f.execCommand('insertHtml',false,'<audio src="'+t.next().find('input[type="text"]').val()+'" style=\"max-width:100%;width:100%;\" controls>您的浏览器不支持audio音频<audio/>');
	    				$(this).off('click');
			  			t.parent().removeClass('tool-checked');
	    				t.next().hide(200);
	    				t.next().find('input[type="file"]').off('change');
	    			});
	    			// 插入视频以本地上传方式
	    			t.next().find('input[type="file"]').on('change',function(){
	    				if(_this.audioUpload == undefined){
	    					alert('未指定音频上传处理地址');
			  				t.parent().removeClass('tool-checked');
	    					t.next().hide(200);
	    					$(this).off('change');
	    					t.next().find('.audio-url-upload').off('click');
	    					return false;
	    				}
	    				var fileData = this.files[0];
	    				var formData = new FormData();
	    				formData.append('face',fileData);
	    				// $_FILES['face'] 接收图片信息
	    				$.ajax({
	    					url : _this.audioUpload,
	    					type : 'POST',
	    					data : formData,
	    					cache:false,         //不设置缓存
						    processData: false,  // 不处理数据
						    contentType: false,  // 不设置内容类型
	    					error:function(xhr) {
	    						alert('发生错误');
	    						console.log(xhr);
	    					},
	    					success:function(data){
	    						var data = JSON.parse(data);
	    						/* '{"msg":"msg","status":"status","url":"url"}' */
	    						if(data.status == 1){
	    							_this.f.execCommand('insertHtml',false,'<audio src="'+data.url+'" style=\"max-width:100%;width:100%;\" controls>您的浏览器不支持audio音频<audio/>');
	    						}else{
	    							alert(data.msg);	
	    						}
	    					}
	    				});
			  			t.parent().removeClass('tool-checked');
	    				t.next().hide(200);
	    				$(this).off('change');
	    				t.next().find('.video-url-upload').off('click');
	    			});
    			}
			break;
			
			// 插入视频
			case 'movie':
				if(t.next()[0].style.display == 'block'){
	    			t.next().hide(200);
			  		t.parent().removeClass('tool-checked');
			  		t.next().find('input[type="file"]').off('change');
    				t.next().find('.video-url-upload').off('click');
    			}else{
	    			t.next().show(200);
			  		t.parent().addClass('tool-checked');
			  		// 插入视频以url方式
	    			t.next().find('.video-url-upload').on('click',function(){
	    				if(t.next().find('input[type="text"]').val().length == 0){
	    					alert('请输入视频链接');
	    					return false;
	    				}
	    				_this.f.execCommand('insertHtml',false,'<video src="'+t.next().find('input[type="text"]').val()+'" style=\"max-width:100%;\" controls>您的浏览器不支持video视频<video/>');
	    				$(this).off('click');
			  			t.parent().removeClass('tool-checked');
	    				t.next().hide(200);
	    				t.next().find('input[type="file"]').off('change');
	    			});
	    			// 插入视频以本地上传方式
	    			t.next().find('input[type="file"]').on('change',function(){
	    				if(_this.videoUpload == undefined){
	    					alert('未指定视频上传处理地址');
			  				t.parent().removeClass('tool-checked');
	    					t.next().hide(200);
	    					$(this).off('change');
	    					t.next().find('.video-url-upload').off('click');
	    					return false;
	    				}
	    				var fileData = this.files[0];
	    				var formData = new FormData();
	    				formData.append('face',fileData);
	    				// $_FILES['face'] 接收图片信息
	    				$.ajax({
	    					url : _this.videoUpload,
	    					type : 'POST',
	    					data : formData,
	    					cache:false,         //不设置缓存
						    processData: false,  // 不处理数据
						    contentType: false,  // 不设置内容类型
	    					error:function(xhr) {
	    						alert('发生错误');
	    						console.log(xhr);
	    					},
	    					success:function(data){
	    						var data = JSON.parse(data);
	    						/* '{"msg":"msg","status":"status","url":"url"}' */
	    						if(data.status == 1){
	    							_this.f.execCommand('insertHtml',false,'<video src="'+data.url+'" style=\"max-width:100%;\" controls>您的浏览器不支持video视频<video/>');
	    						}else{
	    							alert(data.msg);	
	    						}
	    					}
	    				});
			  			t.parent().removeClass('tool-checked');
	    				t.next().hide(200);
	    				$(this).off('change');
	    				t.next().find('.video-url-upload').off('click');
	    			});
    			}
			break;
		}
	});
	// 获取html
	this.getContent = function(){
		if($("#"+_this.id).find('span>a[data-tool="html"]').parent().hasClass('tool-checked')){
			return _this.blackEditDom.find('textarea').val();
		}else{
			return _this.myframe.contentDocument.body.innerHTML;
		}
	}
	// 获取纯文本
	this.getText = function(){
		return _this.myframe.contentDocument.body.innerText;
	}
	// 转换成图片的真实路径,传入file对象
	function getObjectURL(file) {
	    var url = null;
	    if (window.createObjcectURL != undefined) {
	        url = window.createOjcectURL(file);
	    } else if (window.URL != undefined) {
	        url = window.URL.createObjectURL(file);
	    } else if (window.webkitURL != undefined) {
	        url = window.webkitURL.createObjectURL(file);
	    }
	    return url;
	}
	/** 创建元素的函数
	*	@param {string} tagName 标签名
	* 	@param {string} contents 标签内文本
	* 	@param {obj} attr 属性
	*/
	function createTagNode(tagName,contents="",attr={}){
	  var elem=document.createElement(tagName);
	
	  if (typeof(attr)=="object") {
	    if (Object.keys(attr).length>0) {
	      for (var key in attr) {
	        elem.setAttribute(key,attr[key]);
	      }
	    }
	  }
	  elem.innerHTML=contents;
	  return elem;
	}
	/** 往编辑器内head里添加标签
	*	@param {dom} iframeDom 编辑器的iframe
	* 	@param {dom} nodes 一个标签的dom节点
	*/
	function appendBodyTag(iframeDom,nodes)
	{
		iframeDom.appendChild(nodes);
		return true;
	}
	/** 往编辑器内body里添加标签
	*	@param {dom} iframeDom 编辑器的iframe
	* 	@param {dom} nodes 一个标签的dom节点
	*/
	function appendBodyTag(iframeDom,nodes)
	{
		iframeDom.contentDocument.body.appendChild(nodes);
		return true;
	}

}
////////////////////////////////////////////////////////////////////////////////////////////////
