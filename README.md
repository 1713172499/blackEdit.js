# blackEdit.js
一个简单的编辑器

@author black<br>
@email 1713172499@qq.com<br>
@site http://www.hedujin.com<br>
@gibhub https://github.com/1713172499<br>
@date 2018-4-24<br>
 
<h4>引入css与js</h4>
<code>&lt;link rel="stylesheet" type="text/css" href="css/blackEdit.css"/&gt;</code><br>
<code>&lt;link rel="stylesheet" type="text/css" href="css/iconfont.css"/&gt;</code><br>
<code>&lt;script src="js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"&gt;&lt;/script&gt;</code><br>
<code>&lt;script src="js/blackEdit.js" type="text/javascript" charset="utf-8"&gt;&lt;/script&gt;</code><br>

<h4>HTML</h4>
<code>&lt;textarea id="myEdit"&gt;&lt;/textarea&gt;</code>
<h4>js</h4>
<p>js记得在body标签后引用</p>
<code>&lt;script src="js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"&gt;&lt;/script&gt;</code><br>
<code>&lt;script src="js/blackEdit.js" type="text/javascript" charset="utf-8"&gt;&lt;/script&gt;</code><br>
<code>&lt;script type="text/javascript" charset="utf-8"&gt;</code><pre>var myEdit = new blackEdit('myEdit',{
  width : '800px',
  height : '400px'
});
<code>&lt;/script&gt;</code></pre><br>
<p>这样就成功初始化了一个编辑器，实例化返回的变量中有一些索引信息和可用方法。</p>
<code>myEdit.getContent():获取编辑器里的数据。</code><br>
<code>myEdit.getText():获取编辑器里的纯文本数据。</code><br>
  
<h4>可用的实例参数</h4>
<code>@param string textarea的ID</code><br>
<code>@param object data参数</code><br>


<pre>
data 示例参数如下<br>
{
    width : string, // 编辑器宽度 如：500px
    height : string, // 编辑器高度 如：300px
    faceSrc : string, // 表情图片的路径 如：./face/
    imgUpload : url, // 图片上传处理程序地址
    audioUpload : url, // 音频上传处理程序地址
    videoUpload : url, // 视频上传处理程序地址
    resize : boolean, // 是否允许编辑器可调整高度：IE下不支持
    prompt : boolean | string, // 编辑器提示:false为不显示提示
    tools : [
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
    'list-bullet', // 无需列表    'indent-right', // 增加缩进
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
}
 </pre>
